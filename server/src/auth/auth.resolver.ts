import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterUserstDTO } from './dto/register-user.dto';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service'

import { GraphQlLocalAuthenticationGuard } from './guards/graphqlLocauAuthentication.guard';
import RequestWithUser from './requestWithUser.interface';
import { AuthPayload } from './models/authPayload.model';
import LogInDto from './dto/LogInDto';
import { GraphqlJwtAuthGuard } from './guards/graphql-jwt-auth.guard';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { GraphqlJwtRefreshGuard } from './guards/graphql-JwtRefresh.guard';
import { LogoutResponse } from './dto/logoutResponse.dto';
import { EmailConfirmationService } from "../email-confirmation/email-confirmation.service"
import { ForgotPasswordResponse } from './dto/forgetPasswordRes.input';
import { ResetPasswordResponse } from './dto/resetPasswordResponse.iput';


@Resolver(() => User)
export class AuthResolver {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
        private readonly emailConfirmationService: EmailConfirmationService,


    ) { }

    @Query(() => String)
    sayHello(): string {
        return 'Hello World!';
    }

    @Mutation(() => User)
    async registerUser(@Args('registerData') registrationData: RegisterUserstDTO) {
        const user = await this.authService.register(registrationData);
        await this.emailConfirmationService.sendVerificationLink(
            registrationData.email,
        );
        return user;
    }

    @Mutation(() => AuthPayload)
    @UseGuards(GraphQlLocalAuthenticationGuard)
    async login(
        @Args('loginData') loginData: LogInDto,
        @Context() context: { req: RequestWithUser },
    ) {
        const { user } = context.req;

        const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(user.id);
        const { cookie: refreshTokenCookie, token: refreshToken } = this.authService.getCookieWithJwtRefreshToken(user.id);

        await this.usersService.setCurrentRefreshToken(refreshToken, user.id);

        context.req.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

        return {
            user,
            message: "Login successful",
        };
    }

    @Mutation(() => LogoutResponse)
    @UseGuards(GraphqlJwtAuthGuard)
    async logout(@Context() context: { req: RequestWithUser }) {
        const { req } = context;
        await this.usersService.removeRefreshToken(req.user.id);
        req.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());

        return {
            success: true,
            message: 'Logout successful!',
        };
    }

    @UseGuards(GraphqlJwtAuthGuard)
    @Query(() => User)
    async getCurrentUser(@Context() context: { req: RequestWithUser }) {
        return context.req.user;
    }

    @UseGuards(GraphqlJwtRefreshGuard)
    @Query(() => User)
    async refresh(@Context() context: { req: RequestWithUser }) {
        const { user } = context.req;
        const accessTokenCookie = await this.authService.getCookieWithJwtAccessToken(user.id);

        context.req.res.setHeader('Set-Cookie', accessTokenCookie);
        return user;
    };

    @Mutation(() => ForgotPasswordResponse)
    async forgotPassword(@Args('forgotPasswordData') forgotPasswordDto: ForgotPasswordDto): Promise<ForgotPasswordResponse> {
        await this.authService.forgotPassword(forgotPasswordDto);
        return {
            success: true,
            message: 'Password reset email sent successfully. Please check your inbox.',
        };
    }
    


    @Mutation(() => ResetPasswordResponse)
    async resetPassword(@Args('resetPasswordData') resetDetails: ResetPasswordDto) {
        try {
            await this.authService.resetPassword(resetDetails);
            return {
                success: true,
                message: 'Your password has been reset successfully.',
            };
        } catch (error) {
            return {
                success: false,
                error: error.message || 'An error occurred while resetting your password.',
            };
        }
    }
}

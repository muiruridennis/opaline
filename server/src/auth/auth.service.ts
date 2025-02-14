
import { Injectable, HttpStatus, HttpException, BadRequestException } from '@nestjs/common';
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserstDTO } from "./dto/register-user.dto";
import { ForgotPasswordDto } from "./dto/forgotPassword.dto";
import { ChangePasswordDto } from "./dto/changePassword.dto";
import { ResetPasswordDto } from "./dto/resetPassword.dto";
import * as bcrypt from "bcrypt";
import { PostgresErrorCode } from "../database/postgresErrorCodes.enum";
import { TokenPayload } from "./tokenPayload.interface";
import { ConfigService } from "@nestjs/config";
import EmailService from '../email/email.service';
import { TemplateService } from '../templates/templates.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly emailService: EmailService,
        private readonly templateService: TemplateService,
    ) { }

    public async register(registrationData: RegisterUserstDTO) {
        const hashedPassword = await this.usersService.hashPassword(registrationData.password)
        if (registrationData.password !== registrationData.confirmPassword) {
            throw new HttpException('Passwords does not match', HttpStatus.BAD_REQUEST);
        }
        try {
            const createdUser = await this.usersService.createNewUser({
                ...registrationData,
                password: hashedPassword,
                resetLink: ''
            });
            return createdUser;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new HttpException(
                    'User with that email already exists',
                    HttpStatus.BAD_REQUEST
                );
            }

            throw new HttpException(
                'Something went wrong',
                HttpStatus.INTERNAL_SERVER_ERROR
            );

        }
    }
    //To be used in local strategy
    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        const user = await this.usersService.getByEmail(email);
        try {
            await this.verifyPassword(plainTextPassword, user.password);
            user.password = undefined;
            return user;
        } catch (error) {
            throw new HttpException(
                'Wrong credentials provided',
                HttpStatus.BAD_REQUEST
            );
        }
    };

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const passwordIsMatching = await bcrypt.compare(
            plainTextPassword,
            hashedPassword
        );
        if (!passwordIsMatching) {
            throw new HttpException(
                'Wrong credentials provided',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    public getCookieWithJwtToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        // The possibility to provide the secret while calling the  jwtService.sign method has been added in the  7.1.0  version of  @nestjs/jwt
        return (
            `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('TOKEN_EXPIRATION_TIME')}`
        )
    }

    public getCookieWithJwtAccessToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: `${this.configService.get('TOKEN_EXPIRATION_TIME')}s`
        });
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('TOKEN_EXPIRATION_TIME')}`;
    }

    public getCookieWithJwtRefreshToken(userId: number) {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}s`
        });
        const cookie = `Refresh=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`;
        return { cookie, token }
    }

    //A method that generates cookies to clear both the access token and the refresh token
    public getCookiesForLogOut() {
        return [
            'Authentication=; HttpOnly; Path=/; Max-Age=0',
            'Refresh=; HttpOnly; Path=/; Max-Age=0'
        ];
    }

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const user = await this.usersService.getByEmail(email);
        const payload = { email }
        const token = await this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            expiresIn: `${this.configService.get(
                'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
            )}s`,
        });
        await this.usersService.setResetLink(email, token)
        const resetLink = `${this.configService.get("FRONTEND_URL")}/auth/resetpassword/${token}`;
        const replacements = {name: user.name, resetLink };
        const html = this.templateService.getTemplate('forgot-password.html', replacements);
        await this.emailService.sendMail({
            to: email,
            subject: 'Reset your Password',
            html
        });
    }
    async resetPassword(resetDetails: ResetPasswordDto) {
        const { resetLink, password } = resetDetails;
        const hashedPassword = await this.usersService.hashPassword(password)
        await this.decodeConfirmationToken(resetLink);
        const user = await this.usersService.getByResetLink(resetLink);
        await this.usersService.resetPassword(user.email, hashedPassword);

        return { message: ' Password set Successfully' }
    }
    public async decodeConfirmationToken(token: string) {
        // if (!(await this.isEnabled())) {
        //   return;
        // }
        try {
            const payload = await this.jwtService.verify(token, {
                secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            });

            if (typeof payload === 'object' && 'email' in payload) {
                return payload.email;
            }
            throw new BadRequestException();

        } catch (error) {
            if (error?.name === 'TokenExpiredError') {
                throw new BadRequestException('Sorry! The reset token Link expired. Please try again by recovering your account.');
            }
            throw new BadRequestException('Bad reset token');
        }
    }
}
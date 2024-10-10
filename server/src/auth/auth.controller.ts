import {
    Controller, ClassSerializerInterceptor, UseInterceptors, Req,
    UseGuards, Get,
} from '@nestjs/common';
import { AuthService } from "./auth.service";
import RequestWithUser from "./requestWithUser.interface";
import JwtRefreshGuard from "./guards/jwt-refresh.guard";


@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private readonly authService: AuthService,

    ) { }

    @UseGuards(JwtRefreshGuard)
    @Get('refresh-token')
    refresh(@Req() request: RequestWithUser) {
        const accessTokenCookie = this.authService.getCookieWithJwtAccessToken(request.user.id);

        request.res.setHeader('Set-Cookie', accessTokenCookie);
        return request.user;
    };
};
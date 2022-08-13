import { Controller, UseGuards, Request, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Login } from './models/authLogin';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('auth/login')
    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    async login(@Request() req: Login) {
        return this.authService.login(req.user);
    }
}

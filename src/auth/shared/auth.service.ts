import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/shared/user.service';
import * as bcrypt from 'bcrypt';
import { UserToken } from '../models/userToken';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);
        if (user) {
            const isPasswordMatching = await bcrypt.compare(password, user.password);
            if (isPasswordMatching) {
                return {
                    ...user,
                    password: '******',
                };
            }
        }
        throw new Error('Invalid credentials');
    }
    login(user: User): UserToken {
        const payload = {
            email: user.email,
            sub: user.id,
        };
        const accessToken = this.jwtService.sign(payload);

        return {
            access_token: accessToken,
        };
    }
}
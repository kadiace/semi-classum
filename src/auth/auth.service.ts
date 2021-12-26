import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { compare, hash } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user && await this.verifyPassword(pass, user.password)) {
            const { password, ...result } = user;
            return result
        }
        return null
    }

    private async verifyPassword (inputPassword: string, hashedPassword: string,): Promise<boolean | any> {
        const isPasswordMatch = await compare(inputPassword, hashedPassword);
        return isPasswordMatch
    }

    getCookieWithJwtAccessToken(id: number) {
        const payload = { id };
        const token = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
            expiresIn: `${this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')}`,
        });

        return {
            accessToken: token,
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge: Number(this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME')),
        };
    }

    getCookieWithJwtRefreshToken(id: number) {
        const payload = { id };
        const token = this.jwtService.sign(payload, {
          secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: `${this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')}`,
        });
    
        return {
          refreshToken: token,
          domain: 'localhost',
          path: '/',
          httpOnly: true,
          maxAge: Number(this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME')),
        };
    }

    getCookiesForLogOut() {
        return {
          accessOption: {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge: 0,
          },
          refreshOption: {
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            maxAge: 0,
          },
        };
    }

}

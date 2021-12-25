import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result
        }
        return null
    }

    async register(user: User) {
        try {
            const { ...returnUser } = await this.userService.create({
                ...user,
              });
        
              return returnUser;
        } catch (error) {
        }
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

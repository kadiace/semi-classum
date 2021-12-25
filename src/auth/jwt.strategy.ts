import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
      private readonly configService: ConfigService,
      private readonly userService: UserService,
  ) {
    super({
        jwtFromRequest: ExtractJwt.fromExtractors([
            (request) => {
              return request?.cookies?.Authentication;
            },
        ]),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: any) {
    return this.userService.findOne(payload.id);
  }
}
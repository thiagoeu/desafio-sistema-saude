import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET_KEY', // colocar variável de ambiente no real
    });
  }

  async validate(payload: any) {
    // payload tem: { sub: userId, role: userRole }
    return { userId: payload.sub, role: payload.role };
  }
}

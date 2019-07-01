import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey',
    });
  }

  async validate(payload: JwtPayload) {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

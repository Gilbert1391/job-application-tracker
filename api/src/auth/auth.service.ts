import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username } = await this.userRepository.validateUser(
      authCredentialsDto,
    );

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}

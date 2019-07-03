import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { verifyAccount } from './utils/mail.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username } = await this.userRepository.signUp(authCredentialsDto);
    return verifyAccount(username);
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

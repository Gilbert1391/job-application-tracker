import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SignUpPayload } from './interfaces/sign-up.payload.interface';
import { verifyAccount } from './utils/mail.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, verificationKey } = await this.userRepository.signUp(
      authCredentialsDto,
    );
    const payload: SignUpPayload = { username, verificationKey };
    return verifyAccount(payload);
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

  async activateUser(key: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { verification_key: key },
    });

    if (!user || user.is_verified) {
      throw new BadRequestException(
        'Either the provided activation key is invalid or this account has already been activated',
      );
    }
    user.is_verified = true;
    user.verification_key = 'null';
    await user.save();
  }
}

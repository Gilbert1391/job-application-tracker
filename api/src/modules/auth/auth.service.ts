import {
  Injectable,
  BadRequestException,
  ConflictException,
  GoneException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as moment from 'moment';
import * as cryptoRandomString from 'crypto-random-string';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
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

    if (!user) {
      throw new BadRequestException(
        'Either the provided activation key is invalid or this account has already been activated',
      );
    }

    if (this.verificationKeyExpired(user)) {
      throw new GoneException('Your activation key has expired');
    }

    user.is_verified = true;
    user.verification_key = null;
    await user.save();
  }

  // Expiration should be 24 hours
  verificationKeyExpired(user: User): boolean {
    const originalTime = moment(user.verification_key_date);
    const newTime = moment();
    const timeDiff = newTime.diff(originalTime, 'minutes');
    return timeDiff > 3 ? true : false;
  }

  async generateActivationLink(key: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { verification_key: key },
    });

    if (!user) {
      throw new BadRequestException(
        'Either the provided activation key is invalid or this account has already been activated',
      );
    }

    if (!this.verificationKeyExpired(user)) {
      throw new ConflictException(
        'We have already sent you an activation key, please check your email',
      );
    }

    user.verification_key = cryptoRandomString({
      length: 10,
      type: 'url-safe',
    });
    user.verification_key_date = new Date();

    const payload: SignUpPayload = {
      username: user.username,
      verificationKey: user.verification_key,
    };
    verifyAccount(payload);
    await user.save();
  }
}

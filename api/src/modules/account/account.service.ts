import {
  Injectable,
  BadRequestException,
  GoneException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import * as cryptoRandomString from 'crypto-random-string';
import { User } from './../auth/user.entity';
import { UserRepository } from './../auth/user.repository';
import { AccountActivationPayload } from '../../common/interfaces/account-activation-payload.interface';
import { sendEmail } from './../../common/utils/mailer.util';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async activateAccount(key: string): Promise<void> {
    const user = await this.userRepository.getUserByKey(key);

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

  verificationKeyExpired(user: User): boolean {
    const originalTime = moment(user.verification_key_date);
    const newTime = moment();
    const timeDiff = newTime.diff(originalTime, 'minutes');
    return timeDiff > 2 ? true : false;
  }

  async sendActivationKey(key: string): Promise<void> {
    const user = await this.userRepository.getUserByKey(key);

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
    await user.save();

    const payload: AccountActivationPayload = {
      username: user.username,
      verificationKey: user.verification_key,
    };
    return sendEmail(payload);
  }

  async sendActivationLink(username: string): Promise<void> {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user || !user.verification_key) {
      throw new BadRequestException(
        'Either the provided username is invalid or this account has already been activated',
      );
    }

    const payload: AccountActivationPayload = {
      username: user.username,
      verificationKey: user.verification_key,
    };
    return sendEmail(payload);
  }
}

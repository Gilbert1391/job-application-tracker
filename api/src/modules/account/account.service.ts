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
import { EmailPayload } from './../../common/interfaces/email-payload.interface';
import { sendEmail } from './../../common/utils/mailer.util';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async activateAccount(key: string): Promise<void> {
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

  verificationKeyExpired(user: User): boolean {
    const originalTime = moment(user.verification_key_date);
    const newTime = moment();
    const timeDiff = newTime.diff(originalTime, 'minutes');
    return timeDiff > 2 ? true : false;
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
        'We have already sent you an activation link, please check your email',
      );
    }

    user.verification_key = cryptoRandomString({
      length: 10,
      type: 'url-safe',
    });
    await user.save();

    const payload: EmailPayload = {
      username: user.username,
      verificationKey: user.verification_key,
    };
    return sendEmail(payload);
  }
}

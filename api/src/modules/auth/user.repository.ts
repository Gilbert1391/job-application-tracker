import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as cryptoRandomString from 'crypto-random-string';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AccountActivationPayload } from './../../common/interfaces/account-activation-payload.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<AccountActivationPayload> {
    const { username, password } = authCredentialsDto;
    const salt = await bcrypt.genSalt();
    const user = new User();

    user.username = username;
    user.password = await bcrypt.hash(password, salt);
    user.is_verified = false;
    user.verification_key = cryptoRandomString({
      length: 10,
      type: 'url-safe',
    });

    const payload: AccountActivationPayload = {
      username: user.username,
      verificationKey: user.verification_key,
    };

    try {
      await user.save();
      return payload;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUser(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ username: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.is_verified) {
      throw new ForbiddenException('Please verify your account to sign in');
    }

    return { username: user.username };
  }

  async getUserByKey(key: string): Promise<User> {
    const user = await this.findOne({
      where: { verification_key: key },
    });
    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await this.findOne({ username });
    return user;
  }
}

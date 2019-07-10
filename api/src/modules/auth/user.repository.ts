import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ username: string }> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();

    const user = new User();
    user.username = username;
    user.password = await bcrypt.hash(password, salt);
    user.is_verified = false;

    try {
      await user.save();
      return { username: user.username };
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

    return { username: user.username };
  }
}

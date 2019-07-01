import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(204)
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.createUser(createUserDto);
  }
}

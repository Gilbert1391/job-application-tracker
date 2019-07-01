import { IsEmail, MinLength, MaxLength, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  username: string;

  @MinLength(8)
  @MaxLength(128)
  @IsString()
  password: string;
}

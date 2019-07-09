import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsFQDN,
  IsString,
} from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @MaxLength(35)
  @MinLength(3)
  company: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(35)
  @MinLength(5)
  position: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  @MinLength(10)
  @IsFQDN()
  job_post_url: string;

  issue_date: Date;
}

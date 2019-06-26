import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  @MaxLength(35)
  company: string;

  @IsNotEmpty()
  @MaxLength(35)
  position: string;

  @IsNotEmpty()
  job_post_url: string;

  issue_date: Date;
}

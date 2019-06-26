import { IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
  @IsNotEmpty()
  company: string;

  @IsNotEmpty()
  job_post_url: string;

  issue_date: Date;
}

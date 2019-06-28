import { Application } from './../../application/application.entity';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
export class CreateNoteDto {
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(5)
  description: string;

  application_id: number;

  issue_date: Date;
}

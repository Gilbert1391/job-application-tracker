import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
export class CreateNoteDto {
  @IsNotEmpty()
  @MaxLength(100)
  @MinLength(5)
  description: string;

  @IsNotEmpty()
  application_id: number;

  issue_date: Date;
}

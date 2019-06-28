import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  description: string;

  issue_date: Date;
}

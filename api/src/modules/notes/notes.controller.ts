import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Notes } from './note.entity';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createNote(@Body() createNoteDto: CreateNoteDto): Promise<Notes> {
    return this.notesService.createNote(createNoteDto);
  }
}

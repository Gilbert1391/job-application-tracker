import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { Controller, Post, Body } from '@nestjs/common';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}
  @Post()
  createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto);
  }
}

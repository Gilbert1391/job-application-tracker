import { CreateNoteDto } from './dto/create-note.dto';
import { NotesRepository } from './notes.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from './notes.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private notesRepository: NotesRepository,
  ) {}

  async createNote(createNoteDto: CreateNoteDto): Promise<Notes> {
    return this.notesRepository.createNote(createNoteDto);
  }
}

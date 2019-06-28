import { Repository, EntityRepository } from 'typeorm';
import { Notes } from './notes.entity';
import { CreateNoteDto } from './dto/create-note.dto';

@EntityRepository(Notes)
export class NotesRepository extends Repository<Notes> {
  async createNote(createNoteDto: CreateNoteDto): Promise<Notes> {
    const { description } = createNoteDto;

    const note = new Notes();
    note.description = description;
    // note.application = // applicacion id here
    await note.save();
    return note;
  }
}

import { NotFoundException } from '@nestjs/common';
import { Repository, EntityRepository, getRepository } from 'typeorm';
import { Application } from '../application/application.entity';
import { Notes } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';

@EntityRepository(Notes)
export class NotesRepository extends Repository<Notes> {
  async createNote(createNoteDto: CreateNoteDto): Promise<Notes> {
    const { description, application_id } = createNoteDto;

    const applicationRepository = getRepository(Application);
    const application = await applicationRepository.findOne({
      id: application_id,
    });

    if (!application) {
      throw new NotFoundException(
        `Application with ID "${application_id}" not found`,
      );
    }

    const note = new Notes();
    note.description = description;
    note.application = application;

    await note.save();
    delete note.application;
    return note;
  }
}

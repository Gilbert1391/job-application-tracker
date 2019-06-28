import { CreateApplicationDto } from './dto/create-application.dto';
import { EntityRepository, Repository } from 'typeorm';
import {
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Application } from './application.entity';
import { Notes } from './notes/notes.entity';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {
  async getApplications(): Promise<Application[]> {
    const query = this.createQueryBuilder('application')
      .leftJoinAndSelect('application.notes', 'notes')
      .orderBy('issue_date');

    const applications = await query.getMany();
    return applications;
  }

  async getApplicationById(id: number): Promise<Application> {
    const application = await this.findOne(id);
    if (!application) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }
    return application;
  }

  async createApplication(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const { company, position, job_post_url, note } = createApplicationDto;

    const application = new Application();
    application.company = company;
    application.position = position;
    application.job_post_url = job_post_url;

    const notes: Notes[] = note.map(data => {
      const note = new Notes();
      note.description = data.description;
      note.application = application;
      return note;
    });

    application.notes = notes;

    // const application = new Application();
    // application.company = company;
    // application.position = position;
    // application.job_post_url = job_post_url;
    // application.notes = notes;

    try {
      await application.save();
      return application;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Job post url already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateApplication(
    id: number,
    createApplicationDto: CreateApplicationDto,
  ): Promise<void> {
    const application = await this.getApplicationById(id);
    await this.update(application.id, createApplicationDto);
  }

  async deleteApplication(id: number): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }
  }
}

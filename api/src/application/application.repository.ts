import { ApplicationStatus } from './application-status-enum';
import { CreateApplicationDto } from './dto/create-application.dto';
import { EntityRepository, Repository } from 'typeorm';
import {
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Application } from './application.entity';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {
  async getApplications(): Promise<Application[]> {
    const query = this.createQueryBuilder('application')
      .leftJoinAndSelect('application.notes', 'notes')
      .orderBy('application.issued_at');

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
    const { company, position, job_post_url } = createApplicationDto;

    const application = new Application();
    application.company = company;
    application.position = position;
    application.job_post_url = job_post_url;
    application.status = ApplicationStatus.PENDING;

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
    status: ApplicationStatus,
  ): Promise<void> {
    const application = await this.getApplicationById(id);
    const { company, position, job_post_url } = createApplicationDto;

    await this.update(application.id, {
      company,
      position,
      job_post_url,
      status,
    });
  }

  async deleteApplication(id: number): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }
  }
}

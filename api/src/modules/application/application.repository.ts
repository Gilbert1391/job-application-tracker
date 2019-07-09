import { EntityRepository, Repository } from 'typeorm';
import {
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApplicationStatus } from './application-status-enum';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './application.entity';
import { User } from '../auth/user.entity';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {
  async getApplications(user: User): Promise<Application[]> {
    const applications = await this.find({ where: { userId: user.id } });
    return applications;
  }

  async getApplicationById(id: number, user: User): Promise<Application> {
    const application = await this.findOne({ where: { id, userId: user.id } });

    if (!application) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }

    return application;
  }

  async createApplication(
    createApplicationDto: CreateApplicationDto,
    user: User,
  ): Promise<Application> {
    const { company, position, job_post_url } = createApplicationDto;

    const application = new Application();
    application.company = company;
    application.position = position;
    application.job_post_url = job_post_url;
    application.status = ApplicationStatus.PENDING;
    application.user = user;

    try {
      await application.save();
      delete application.user;
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
    user: User,
  ): Promise<void> {
    const application = await this.getApplicationById(id, user);
    const { company, position, job_post_url } = createApplicationDto;

    await this.update(application.id, {
      company,
      position,
      job_post_url,
      status,
    });
  }

  async deleteApplication(id: number, user: User): Promise<void> {
    const result = await this.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }
  }
}

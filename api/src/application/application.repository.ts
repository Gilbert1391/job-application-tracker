import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './application.entity';
import { EntityRepository, Repository, UpdateResult } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {
  async getApplications(): Promise<Application[]> {
    const query = this.createQueryBuilder('application');
    query.orderBy('issue_date');

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

    await application.save();
    return application;
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

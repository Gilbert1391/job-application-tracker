import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './application.entity';
import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {
  async getApplications(): Promise<Application[]> {
    const query = this.createQueryBuilder('application');
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
    const { company, job_post_url } = createApplicationDto;
    const application = new Application();
    application.company = company;
    application.job_post_url = job_post_url;

    await application.save();
    return application;
  }

  async updateApplication(
    id: number,
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const application = await this.getApplicationById(id);
    const { company, job_post_url } = createApplicationDto;

    application.company = company;
    application.job_post_url = job_post_url;

    application.save();
    return application;
  }

  async deleteApplication(id: number): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Application with ID "${id}" not found`);
    }
  }
}

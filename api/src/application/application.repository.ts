import { CreateApplicationDto } from './dto/createApplicationDto';
import { Application } from './application.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {
  async getApplications(): Promise<Application[]> {
    const query = this.createQueryBuilder('application');
    const applications = await query.getMany();
    return applications;
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
}

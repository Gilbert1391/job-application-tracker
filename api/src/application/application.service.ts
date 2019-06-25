import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRepository } from './application.repository';
import { CreateApplicationDto } from './dto/createApplicationDto';
import { Application } from './application.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: ApplicationRepository,
  ) {}

  async getApplications(): Promise<Application[]> {
    return this.applicationRepository.getApplications();
  }

  async createApplication(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return this.applicationRepository.createApplication(createApplicationDto);
  }
}

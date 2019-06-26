import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRepository } from './application.repository';
import { CreateApplicationDto } from './dto/create-application.dto';
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

  async getApplicationById(id: number): Promise<Application> {
    return this.applicationRepository.getApplicationById(id);
  }

  async createApplication(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return this.applicationRepository.createApplication(createApplicationDto);
  }

  async updateApplication(
    id: number,
    createApplicationDto: CreateApplicationDto,
  ): Promise<void> {
    return this.applicationRepository.updateApplication(
      id,
      createApplicationDto,
    );
  }

  async deleteApplication(id: number): Promise<void> {
    return this.applicationRepository.deleteApplication(id);
  }
}

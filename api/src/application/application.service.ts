import { ApplicationStatus } from './application-status-enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationRepository } from './application.repository';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './application.entity';
import { User } from './../auth/user.entity';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: ApplicationRepository,
  ) {}

  async getApplications(user: User): Promise<Application[]> {
    return this.applicationRepository.getApplications(user);
  }

  async getApplicationById(id: number, user: User): Promise<Application> {
    return this.applicationRepository.getApplicationById(id, user);
  }

  async createApplication(
    createApplicationDto: CreateApplicationDto,
    user: User,
  ): Promise<Application> {
    return this.applicationRepository.createApplication(
      createApplicationDto,
      user,
    );
  }

  async updateApplication(
    id: number,
    createApplicationDto: CreateApplicationDto,
    status: ApplicationStatus,
    user: User,
  ): Promise<void> {
    return this.applicationRepository.updateApplication(
      id,
      createApplicationDto,
      status,
      user,
    );
  }

  async deleteApplication(id: number, user: User): Promise<void> {
    return this.applicationRepository.deleteApplication(id, user);
  }
}

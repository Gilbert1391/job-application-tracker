import { ApplicationService } from './application.service';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateApplicationDto } from './dto/createApplicationDto';
import { Application } from './application.entity';

@Controller('applications')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get()
  getAllApplications(): Promise<Application[]> {
    return this.applicationService.getApplications();
  }

  @Post()
  createApplication(
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return this.applicationService.createApplication(createApplicationDto);
  }
}

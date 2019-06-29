import { ApplicationStatus } from './application-status-enum';
import { ApplicationStatusValidationPipe } from './pipes/application-status-validation.pipe';
import { ApplicationService } from './application.service';
import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './application.entity';

@Controller('applications')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get()
  getAllApplications(): Promise<Application[]> {
    return this.applicationService.getApplications();
  }

  @Get('/:id')
  getApplicationById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Application> {
    return this.applicationService.getApplicationById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createApplication(
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return this.applicationService.createApplication(createApplicationDto);
  }

  @Put('/:id')
  @HttpCode(204)
  @UsePipes(ValidationPipe)
  updateApplication(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ApplicationStatusValidationPipe) status: ApplicationStatus,
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<void> {
    return this.applicationService.updateApplication(
      id,
      createApplicationDto,
      status,
    );
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteApplication(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.applicationService.deleteApplication(id);
  }
}

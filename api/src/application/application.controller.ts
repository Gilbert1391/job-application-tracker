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
  @UsePipes(ValidationPipe)
  updateApplication(
    @Param('id', ParseIntPipe) id: number,
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return this.applicationService.updateApplication(id, createApplicationDto);
  }

  @Delete('/:id')
  deleteApplication(@Param('id', ParseIntPipe) id: number) {
    return this.applicationService.deleteApplication(id);
  }
}

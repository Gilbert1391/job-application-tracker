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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationStatus } from './application-status-enum';
import { ApplicationStatusValidationPipe } from './pipes/application-status-validation.pipe';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { Application } from './application.entity';
import { User } from './../auth/user.entity';
import { GetUser } from '../auth/decorators/user.decorator';

@Controller('applications')
@UseGuards(AuthGuard())
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get()
  getAllApplications(@GetUser() user: User): Promise<Application[]> {
    return this.applicationService.getApplications(user);
  }

  @Get('/:id')
  getApplicationById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Application> {
    return this.applicationService.getApplicationById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createApplication(
    @Body() createApplicationDto: CreateApplicationDto,
    @GetUser() user: User,
  ): Promise<Application> {
    return this.applicationService.createApplication(
      createApplicationDto,
      user,
    );
  }

  @Put('/:id')
  @HttpCode(204)
  updateApplication(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ApplicationStatusValidationPipe) status: ApplicationStatus,
    @Body(ValidationPipe) createApplicationDto: CreateApplicationDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.applicationService.updateApplication(
      id,
      createApplicationDto,
      status,
      user,
    );
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteApplication(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.applicationService.deleteApplication(id, user);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { ApplicationRepository } from './application.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationRepository])],
  controllers: [ApplicationController],
  providers: [ApplicationService],
})
export class ApplicationModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from './application/application.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from '../config/typeorm.config';
import { AccountModule } from './account/account.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ApplicationModule,
    NotesModule,
    AuthModule,
    AccountModule,
  ],
})
export class AppModule {}

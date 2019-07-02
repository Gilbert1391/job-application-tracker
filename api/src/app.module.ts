import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationModule } from './application/application.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ApplicationModule,
    NotesModule,
    AuthModule,
  ],
})
export class AppModule {}

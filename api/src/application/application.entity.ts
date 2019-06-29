import { ApplicationStatus } from './application-status-enum';
import { Notes } from '../notes/note.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';

@Entity()
@Unique(['job_post_url'])
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  company: string;

  @Column()
  position: string;

  @Column()
  job_post_url: string;

  @Column()
  status: ApplicationStatus;

  @OneToMany(type => Notes, note => note.application, {
    eager: true,
  })
  notes: Notes[];

  @CreateDateColumn()
  issue_date: Date;
}

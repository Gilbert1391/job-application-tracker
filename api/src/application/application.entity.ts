import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  Unique,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ApplicationStatus } from './application-status-enum';
import { Notes } from '../notes/note.entity';
import { User } from './../auth/user.entity';

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

  @ManyToOne(type => User, user => user.applications, { eager: false })
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  issued_at: Date;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Notes } from './notes/notes.entity';

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

  @OneToMany(type => Notes, notes => notes.application)
  notes: Notes[];

  @CreateDateColumn()
  issue_date: Date;
}

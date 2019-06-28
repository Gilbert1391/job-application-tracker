import { Application } from '../application.entity';
import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Entity,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Notes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @CreateDateColumn()
  note_issue_date: Date;

  @ManyToOne(type => Application, application => application.notes)
  application: Application;
}

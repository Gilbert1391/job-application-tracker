import { Application } from '../application/application.entity';
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

  @ManyToOne(type => Application, application => application.notes, {
    eager: false,
    onDelete: 'CASCADE',
  })
  application: Application;

  @Column()
  applicationId: number;

  @CreateDateColumn()
  note_issue_date: Date;
}

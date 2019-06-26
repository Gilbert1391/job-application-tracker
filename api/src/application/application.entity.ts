import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  Unique,
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

  @CreateDateColumn()
  issue_date: Date;
}

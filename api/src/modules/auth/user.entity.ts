import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Application } from '../application/application.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  is_verified: boolean;

  @Column({ nullable: true })
  verification_key: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  verification_key_date: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  registration_date: Date;

  @OneToMany(type => Application, application => application.user, {
    eager: true,
  })
  applications: Application[];
}

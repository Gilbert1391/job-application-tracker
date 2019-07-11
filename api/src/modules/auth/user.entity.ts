import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  CreateDateColumn,
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

  @Column()
  verification_key: string;

  @CreateDateColumn()
  registration_date: Date;

  @OneToMany(type => Application, application => application.user, {
    eager: true,
  })
  applications: Application[];
}

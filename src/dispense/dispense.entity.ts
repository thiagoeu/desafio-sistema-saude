// src/dispense/entities/dispense.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { Prescription } from '../prescription/prescription.entity';
import { User } from '../users/user.entity';

@Entity('dispenses')
export class Dispense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Prescription, (prescription) => prescription.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  prescription: Prescription;

  @ManyToOne(() => User, (user) => user.id, {
    eager: true,
    onDelete: 'SET NULL',
  })
  dispensedBy: User;

  @Column()
  quantity: number;

  @CreateDateColumn()
  dispensedAt: Date;
}

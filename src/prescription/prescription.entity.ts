import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Patient } from '../patient/patient.entity';
import { Medicine } from '../medicine/medicine.entity';
import { User } from '../users/user.entity';

@Entity('prescriptions')
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Patient, (patient) => patient.prescriptions)
  patient: Patient;

  @ManyToOne(() => Medicine, (medicine) => medicine.prescriptions)
  medicine: Medicine;

  @Column()
  quantity: number;

  @Column()
  usagePeriod: string;

  @ManyToOne(() => User)
  createdBy: User;

  @CreateDateColumn()
  createdAt: Date;
}

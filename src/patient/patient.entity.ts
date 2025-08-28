import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Prescription } from '../prescription/prescription.entity';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  medicalHistory: string;

  // Se o paciente também tiver usuário no sistema
  @OneToOne(() => User, (user) => user.patient)
  @JoinColumn()
  user?: User;

  @OneToMany(() => Prescription, (prescription) => prescription.patient)
  prescriptions: Prescription[];
}

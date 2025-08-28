import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '../shared/enums/role.enum';
import { Patient } from '../patient/patient.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.PACIENTE })
  role: Role;

  // Se o usuário for paciente e tiver acesso ao sistema
  @OneToOne(() => Patient, (patient) => patient.user, { nullable: true })
  @JoinColumn()
  patient?: Patient;
}

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

  @Column({ select: false }) // Não retorna senha por padrão
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.PACIENTE })
  role: Role;

  @Column({ type: 'text', nullable: true, select: false }) // Corrigido
  currentHashedRefreshToken: string | null;

  @OneToOne(() => Patient, (patient) => patient.user, { nullable: true })
  @JoinColumn()
  patient?: Patient;
}

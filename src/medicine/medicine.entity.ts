import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Prescription } from '../prescription/prescription.entity';

@Entity('medicines')
export class Medicine {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  dosage: string;

  @Column()
  quantityInStock: number;

  @Column()
  expirationDate: Date;

  @Column()
  manufacturer: string;

  @OneToMany(() => Prescription, (prescription) => prescription.medicine)
  prescriptions: Prescription[];
}

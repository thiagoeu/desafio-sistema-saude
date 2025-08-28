import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prescription } from './prescription.entity';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Patient } from '../patient/patient.entity';
import { Medicine } from '../medicine/medicine.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreatePrescriptionDto, userId: string) {
    const patient = await this.patientRepository.findOne({
      where: { id: dto.patientId },
    });
    const medicine = await this.medicineRepository.findOne({
      where: { id: dto.medicineId },
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!patient) throw new NotFoundException(`Patient not found`);
    if (!medicine) throw new NotFoundException(`Medicine not found`);
    if (!user) throw new NotFoundException(`User not found`);

    const prescription = this.prescriptionRepository.create({
      patient,
      medicine,
      quantity: dto.quantity,
      usagePeriod: dto.usagePeriod,
      createdBy: user,
    });

    return this.prescriptionRepository.save(prescription);
  }

  findAll() {
    return this.prescriptionRepository.find({
      relations: ['patient', 'medicine', 'createdBy'],
    });
  }

  async findOne(id: string) {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id },
      relations: ['patient', 'medicine', 'createdBy'],
    });
    if (!prescription)
      throw new NotFoundException(`Prescription ${id} not found`);
    return prescription;
  }

  async update(id: string, dto: UpdatePrescriptionDto) {
    const prescription = await this.findOne(id);

    if (dto.patientId) {
      const patient = await this.patientRepository.findOne({
        where: { id: dto.patientId },
      });
      if (!patient) throw new NotFoundException(`Patient not found`);
      prescription.patient = patient;
    }

    if (dto.medicineId) {
      const medicine = await this.medicineRepository.findOne({
        where: { id: dto.medicineId },
      });
      if (!medicine) throw new NotFoundException(`Medicine not found`);
      prescription.medicine = medicine;
    }

    if (dto.quantity !== undefined) prescription.quantity = dto.quantity;
    if (dto.usagePeriod !== undefined)
      prescription.usagePeriod = dto.usagePeriod;

    return this.prescriptionRepository.save(prescription);
  }

  async remove(id: string) {
    const prescription = await this.findOne(id);
    return this.prescriptionRepository.remove(prescription);
  }
}

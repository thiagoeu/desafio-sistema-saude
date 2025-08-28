import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  create(dto: CreatePatientDto) {
    const patient = this.patientRepository.create(dto);
    return this.patientRepository.save(patient);
  }

  findAll() {
    return this.patientRepository.find();
  }

  async findOne(id: string) {
    const patient = await this.patientRepository.findOne({ where: { id } });
    if (!patient) throw new NotFoundException(`Patient ${id} not found`);
    return patient;
  }

  async update(id: string, dto: UpdatePatientDto) {
    await this.patientRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const patient = await this.findOne(id);
    return this.patientRepository.remove(patient);
  }
}

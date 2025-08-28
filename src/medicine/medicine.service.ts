import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicine } from './medicine.entity';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';

@Injectable()
export class MedicineService {
  constructor(
    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>,
  ) {}

  create(dto: CreateMedicineDto) {
    const medicine = this.medicineRepository.create(dto);
    return this.medicineRepository.save(medicine);
  }

  findAll() {
    return this.medicineRepository.find();
  }

  async findOne(id: string) {
    const medicine = await this.medicineRepository.findOne({ where: { id } });
    if (!medicine) throw new NotFoundException(`Medicine ${id} not found`);
    return medicine;
  }

  async update(id: string, dto: UpdateMedicineDto) {
    await this.medicineRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const medicine = await this.findOne(id);
    return this.medicineRepository.remove(medicine);
  }
}

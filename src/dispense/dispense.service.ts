import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dispense } from './dispense.entity';
import { CreateDispenseDto } from './dto/create-dispense.dto';
import { Prescription } from 'src/prescription/prescription.entity';
import { User } from 'src/users/user.entity';
import { Medicine } from 'src/medicine/medicine.entity';

@Injectable()
export class DispenseService {
  constructor(
    @InjectRepository(Dispense)
    private dispenseRepository: Repository<Dispense>,

    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Medicine)
    private medicineRepository: Repository<Medicine>,
  ) {}

  async create(dto: CreateDispenseDto) {
    const prescription = await this.prescriptionRepository.findOne({
      where: { id: dto.prescriptionId },
      relations: ['medicine', 'patient'],
    });
    if (!prescription) throw new NotFoundException('Prescription not found');

    const user = await this.userRepository.findOne({
      where: { id: dto.dispensedById },
    });
    if (!user) throw new NotFoundException('User not found');

    const medicine = await this.medicineRepository.findOne({
      where: { id: prescription.medicine.id },
    });
    if (!medicine) throw new NotFoundException('Medicine not found');

    if (medicine.stock < dto.quantity) {
      throw new BadRequestException('Not enough stock available');
    }

    // Atualiza o estoque do medicamento
    medicine.stock -= dto.quantity;
    await this.medicineRepository.save(medicine);

    // Cria o registro de entrega
    const dispense = this.dispenseRepository.create({
      prescription,
      dispensedBy: user,
      quantity: dto.quantity,
    });

    return this.dispenseRepository.save(dispense);
  }

  findAll() {
    return this.dispenseRepository.find();
  }

  async findOne(id: string) {
    const dispense = await this.dispenseRepository.findOne({ where: { id } });
    if (!dispense) throw new NotFoundException('Dispense not found');
    return dispense;
  }
}

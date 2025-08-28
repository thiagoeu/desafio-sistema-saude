import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';
import { Medicine } from './medicine.entity';
import { Prescription } from '../prescription/prescription.entity'; // ✅ importar

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicine, Prescription]), // ✅ adicionar aqui
  ],
  controllers: [MedicineController],
  providers: [MedicineService],
  exports: [MedicineService],
})
export class MedicineModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispense } from './dispense.entity';
import { DispenseService } from './dispense.service';
import { DispenseController } from './dispense.controller';
import { Prescription } from 'src/prescription/prescription.entity';
import { User } from 'src/users/user.entity';
import { Medicine } from 'src/medicine/medicine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dispense, Prescription, User, Medicine])],
  controllers: [DispenseController],
  providers: [DispenseService],
})
export class DispenseModule {}

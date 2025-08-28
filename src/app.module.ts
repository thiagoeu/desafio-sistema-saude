import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

// Database
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './users/users.module';
import { PatientModule } from './patient/patient.module';
import { MedicineModule } from './medicine/medicine.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { DispenseModule } from './dispense/dispense.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useFactory: databaseConfig }),
    UsersModule,
    PatientModule,
    MedicineModule,
    PrescriptionModule,
    DispenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

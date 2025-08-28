import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { CreateMedicineDto } from './dto/create-medicine.dto';
import { UpdateMedicineDto } from './dto/update-medicine.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('medicines')
@Controller('medicines')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post()
  create(@Body() dto: CreateMedicineDto) {
    return this.medicineService.create(dto);
  }

  @Get()
  findAll() {
    return this.medicineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicineService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMedicineDto) {
    return this.medicineService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicineService.remove(id);
  }
}

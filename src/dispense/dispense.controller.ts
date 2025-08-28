import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DispenseService } from './dispense.service';
import { CreateDispenseDto } from './dto/create-dispense.dto';

@Controller('dispenses')
export class DispenseController {
  constructor(private readonly dispenseService: DispenseService) {}

  @Post()
  create(@Body() dto: CreateDispenseDto) {
    return this.dispenseService.create(dto);
  }

  @Get()
  findAll() {
    return this.dispenseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispenseService.findOne(id);
  }
}

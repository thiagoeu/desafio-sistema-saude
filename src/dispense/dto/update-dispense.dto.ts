import { PartialType } from '@nestjs/mapped-types';
import { CreateDispenseDto } from './create-dispense.dto';

export class UpdateDispenseDto extends PartialType(CreateDispenseDto) {}

import { IsNotEmpty, IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicineDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  dosage: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantityInStock: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  expirationDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  manufacturer: string;
}

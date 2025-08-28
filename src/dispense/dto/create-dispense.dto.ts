import { IsUUID, IsInt, Min } from 'class-validator';

export class CreateDispenseDto {
  @IsUUID()
  prescriptionId: string;

  @IsUUID()
  dispensedById: string;

  @IsInt()
  @Min(1)
  quantity: number;
}

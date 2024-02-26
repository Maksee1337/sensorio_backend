import { SensorType } from '@prisma/client';
import { IsEmpty, IsEnum, IsIn, IsNotEmpty, IsString } from 'class-validator';

export class AddSensorDto {
  @IsString()
  @IsNotEmpty()
  deviceApiKey: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(Array.from(Object.keys(SensorType)))
  type: SensorType;

  @IsEmpty()
  id: any;
}

import { IsNumberString, IsString, Length } from 'class-validator';
import { DeviceIdDto } from './deviceId.dto';

export class GetSensorDto extends DeviceIdDto {
  @IsNumberString()
  sensorId: number;
}

import { IsObject, IsString, Validate } from 'class-validator';
import { IsKeyValueValidator } from '../../../core/validators/isKeyValue.validator';

export class sensorDto {
  [key: string]: any;
}
export class AddSensorDataDto {
  @IsString()
  deviceApiKey: string;

  @IsObject()
  @Validate(IsKeyValueValidator, [{ message: 'Not validate!' }])
  sensorsData: Object;
}

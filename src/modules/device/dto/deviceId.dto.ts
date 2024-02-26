import { IsString, Length } from 'class-validator';

export class DeviceIdDto {
  @IsString()
  @Length(16, 16)
  deviceApiKey: string;
}

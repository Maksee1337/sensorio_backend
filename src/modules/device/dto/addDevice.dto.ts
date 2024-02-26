import { IsEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class AddDeviceDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsEmpty()
  id: any;
}

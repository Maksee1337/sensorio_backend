import { IsString, IsStrongPassword, Length } from 'class-validator';

export class LoginDto {
  @IsString()
  @Length(4, 12)
  username: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}

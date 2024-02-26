import { IsEmpty, IsString, IsStrongPassword, Length } from 'class-validator';
import { IUser } from '../../../interfaces/iUser';

export class SignupDto implements IUser {
  @IsString()
  @Length(4, 12)
  username: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsEmpty()
  id: any;
}

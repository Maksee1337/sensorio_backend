import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import messages from '../../core/constants/messages';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  private makeAccessToken(user: User) {
    const payload = { id: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }

  async signup(signupDto: SignupDto): Promise<{ access_token: string }> {
    let user: User = await this.userService.findUserByUsername(signupDto.username);
    if (user) throw new ConflictException(messages.exceptions.USERNAME_EXISTS);
    user = await this.userService.createUser({
      ...signupDto,
      password: await bcrypt.hash(signupDto.password, 10),
    });
    return { access_token: this.makeAccessToken(user) };
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user: User = await this.userService.findUserByUsername(loginDto.username);
    if (!user) {
      throw new NotFoundException(messages.exceptions.USER_NOT_FOUND);
    }
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException(messages.exceptions.INVALID_PASSWORD);
    }
    return { access_token: this.makeAccessToken(user) };
  }
}

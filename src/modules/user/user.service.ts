import { ConflictException, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findUserByUsername(username: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { username } });
  }
}

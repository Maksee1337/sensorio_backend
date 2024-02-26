import { Module } from '@nestjs/common';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { PrismaService } from '../../prisma.service';

@Module({
  controllers: [SensorController],
  providers: [SensorService, PrismaService],
  exports: [SensorService],
})
export class SensorModule {}

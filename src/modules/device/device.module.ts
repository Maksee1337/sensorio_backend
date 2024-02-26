import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { PrismaService } from '../../prisma.service';
import { SensorModule } from '../sensor/sensor.module';

@Module({
  imports: [SensorModule],
  controllers: [DeviceController],
  providers: [DeviceService, PrismaService],
})
export class DeviceModule {}

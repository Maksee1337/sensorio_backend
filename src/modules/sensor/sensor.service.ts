import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

import { ISensor } from '../../interfaces/iSensor';
import { ISensorsData } from '../../interfaces/iSensorsData';

@Injectable()
export class SensorService {
  constructor(private prisma: PrismaService) {}

  async addSensor(data: ISensor) {
    return this.prisma.sensor.create({ data });
  }

  async addSensorData(data: ISensorsData[]) {
    await this.prisma.measurement.createMany({ data });
    return data;
  }
}

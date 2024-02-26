import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AddDeviceDto } from './dto/addDevice.dto';
import { PrismaService } from '../../prisma.service';
import { Device } from '@prisma/client';
import { generateRandomString } from '../../core/helpers';
import messages from '../../core/constants/messages';
import { AddSensorDto } from './dto/addSensor.dto';
import { SensorService } from '../sensor/sensor.service';
import { AddSensorDataDto } from './dto/addSensorData.dto';
import { ISensorsData } from '../../interfaces/iSensorsData';
import { GetSensorDto } from './dto/getSensor.dto.dto';

@Injectable()
export class DeviceService {
  constructor(
    private prisma: PrismaService,
    private sensorService: SensorService,
  ) {}
  async addDevice(userId: number, addDeviceDto: AddDeviceDto): Promise<Device> {
    try {
      return await this.prisma.device.create({
        data: {
          name: addDeviceDto.name,
          userId,
          apiKey: generateRandomString(16),
        },
      });
    } catch (error) {
      throw new ConflictException(messages.exceptions.ERROR_ADDING_DEVICE);
    }
  }

  async getAllDevices(userId: number): Promise<Device[]> {
    return this.prisma.device.findMany({
      where: { userId },
      include: {
        sensors: {
          select: { id: true, apiKey: true, type: true, lastUpdate: true },
        },
      },
    });
  }

  async addSensor(userId: number, addSensorDto: AddSensorDto) {
    const device = await this.prisma.device.findUnique({
      where: { apiKey: addSensorDto.deviceApiKey },
    });
    if (!device || device.userId !== userId)
      throw new NotFoundException(messages.exceptions.DEVICE_NOT_FOUND);

    return this.sensorService.addSensor({
      type: addSensorDto.type,
      apiKey: generateRandomString(16),
      deviceId: device.id,
      lastUpdate: new Date(),
    });
  }

  async addSensorData(addSensorDataDto: AddSensorDataDto) {
    const keys: number[] = Object.keys(addSensorDataDto.sensorsData).map(
      Number,
    );
    const device = await this.prisma.device.findUnique({
      where: { apiKey: addSensorDataDto.deviceApiKey },
      include: {
        sensors: {
          where: { id: { in: keys } },
          select: { id: true },
        },
      },
    });
    if (!device)
      throw new NotFoundException(messages.exceptions.DEVICE_NOT_FOUND);

    const dataToAdd = device.sensors.map<ISensorsData>((el) => ({
      sensorId: el.id,
      value: addSensorDataDto.sensorsData[el.id],
    }));
    await this.sensorService.addSensorData(dataToAdd);
    return dataToAdd;
  }

  async getOneDevice(userId: number, deviceId: string) {
    const device = await this.prisma.device.findUnique({
      where: { apiKey: deviceId, userId },
      include: {
        sensors: {
          select: { id: true, type: true, lastUpdate: true },
        },
      },
    });
    if (!device)
      throw new NotFoundException(messages.exceptions.DEVICE_NOT_FOUND);

    return device;
  }

  async getOneSensor(userId: number, params: GetSensorDto) {
    const device = await this.prisma.device.findUnique({
      where: { apiKey: params.deviceApiKey, userId },
      include: {
        sensors: {
          where: { id: +params.sensorId },
          // select: { id: true, type: true, lastUpdate: true },
          include: {
            measurements: {
              select: {
                value: true,
                id: true,
                createdAt: true,
              },
            },
          },
        },
      },
    });

    if (!device || !device.sensors.length)
      throw new NotFoundException(messages.exceptions.DEVICE_NOT_FOUND);
    console.log(params);
    return device.sensors[0];
  }
}

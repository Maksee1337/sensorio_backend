import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AddDeviceDto } from './dto/addDevice.dto';
import { DeviceService } from './device.service';
import { UserGuard } from '../../core/guards/user.guard';
import { AddSensorDto } from './dto/addSensor.dto';
import { AddSensorDataDto } from './dto/addSensorData.dto';
import { DeviceIdDto } from './dto/deviceId.dto';
import { GetSensorDto } from './dto/getSensor.dto.dto';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @UseGuards(UserGuard)
  @Post()
  addDevice(@Req() request: any, @Body() addDeviceDto: AddDeviceDto) {
    const userId = request.user.id;
    return this.deviceService.addDevice(userId, addDeviceDto);
  }

  @UseGuards(UserGuard)
  @Get()
  getAllDevices(@Req() request: any) {
    const userId = request.user.id;
    return this.deviceService.getAllDevices(userId);
  }

  @UseGuards(UserGuard)
  @Post('sensor')
  addSensor(@Req() request: any, @Body() addSensorDto: AddSensorDto) {
    const userId = request.user.id;
    return this.deviceService.addSensor(userId, addSensorDto);
  }

  @Post('data')
  addSensorData(@Body() data: AddSensorDataDto) {
    return this.deviceService.addSensorData(data);
  }

  @UseGuards(UserGuard)
  @Get(':deviceApiKey')
  findOne(@Req() request: any, @Param() { deviceApiKey }: DeviceIdDto) {
    const userId = request.user.id;
    return this.deviceService.getOneDevice(userId, deviceApiKey);
  }

  @UseGuards(UserGuard)
  @Get(':deviceApiKey/:sensorId')
  findOneSensor(@Req() request: any, @Param() params: GetSensorDto) {
    const userId = request.user.id;
    return this.deviceService.getOneSensor(userId, params);
  }
}

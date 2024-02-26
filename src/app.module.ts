import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { DeviceModule } from './modules/device/device.module';
import { SensorModule } from './modules/sensor/sensor.module';
import configuration from './core/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    AuthModule,
    UserModule,
    DeviceModule,
    SensorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

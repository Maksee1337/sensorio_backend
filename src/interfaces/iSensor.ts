import { Sensor, SensorType } from '@prisma/client';

export interface ISensor {
  id?: number;
  type: SensorType;
  apiKey: string;
  deviceId: number;
  lastUpdate: Date;
}

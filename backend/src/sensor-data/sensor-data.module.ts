import { Module } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { SensorDataController } from './sensor-data.controller';
import { PrismaModule } from 'src/prisma.module';
import { SensorDataGateway } from './sensor-data.gateway';

@Module({
  controllers: [SensorDataController],
  providers: [SensorDataService, SensorDataGateway],
  exports: [SensorDataService],
  imports: [PrismaModule],
})
export class SensorDataModule {}

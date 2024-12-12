import { Module } from '@nestjs/common';
import { SensorDataService } from './sensor-data.service';
import { SensorDataController } from './sensor-data.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [SensorDataController],
  providers: [SensorDataService],
  exports: [SensorDataService],
  imports: [PrismaModule],
})
export class SensorDataModule {}

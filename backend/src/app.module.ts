import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SensorDataModule } from './sensor-data/sensor-data.module';
import { CollectionScheduleModule } from './collection-schedule/collection-schedule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UsersModule,
    SensorDataModule,
    CollectionScheduleModule,
  ],
})
export class AppModule {}

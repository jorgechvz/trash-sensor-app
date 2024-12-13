import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SensorDataModule } from './sensor-data/sensor-data.module';
import { CollectionScheduleModule } from './collection-schedule/collection-schedule.module';
import configuration from './config/configuration';
import { AlertModule } from './alert/alert.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration]
    }),
    AlertModule,
    UsersModule,
    SensorDataModule,
    CollectionScheduleModule,
  ],
})
export class AppModule {}

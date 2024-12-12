import { Module } from '@nestjs/common';
import { CollectionScheduleService } from './collection-schedule.service';
import { CollectionScheduleController } from './collection-schedule.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  controllers: [CollectionScheduleController],
  providers: [CollectionScheduleService],
  imports: [PrismaModule],
  exports: [CollectionScheduleService],
})
export class CollectionScheduleModule {}

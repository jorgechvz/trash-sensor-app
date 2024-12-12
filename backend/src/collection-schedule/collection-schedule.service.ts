import { Injectable } from '@nestjs/common';
import {
  CreateCollectionScheduleDto,
  CreateCollectionStatDto,
} from './dto/create-collection-schedule.dto';
import { UpdateCollectionScheduleDto } from './dto/update-collection-schedule.dto';
import { PrismaService } from 'src/prisma.service';
import { CollectionStats } from '@prisma/client';

@Injectable()
export class CollectionScheduleService {
  constructor(private prisma: PrismaService) {}
  async create(createCollectionScheduleDto: CreateCollectionScheduleDto) {
    const data = await this.prisma.collectionSchedule.create({
      data: {
        containerId: createCollectionScheduleDto.containerId,
        scheduledAt: createCollectionScheduleDto.scheduleAt,
        status: createCollectionScheduleDto.status || 'Programado',
      },
    });
    return data;
  }

  findAll() {
    return this.prisma.collectionSchedule.findMany({
      orderBy: {
        scheduledAt: 'asc',
      },
    });
  }

  findOne(id: string) {
    return this.prisma.collectionSchedule.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updateCollectionScheduleDto: UpdateCollectionScheduleDto,
  ) {
    const data = await this.prisma.collectionSchedule.update({
      where: {
        id,
      },
      data: {
        containerId: updateCollectionScheduleDto.containerId,
        scheduledAt: updateCollectionScheduleDto.scheduleAt,
        status: updateCollectionScheduleDto.status,
      },
    });
    return data;
  }

  async remove(id: string) {
    return this.prisma.collectionSchedule.delete({
      where: {
        id,
      },
    });
  }

  // CollectionStats
  async getStats(): Promise<CollectionStats[]> {
    return this.prisma.collectionStats.findMany();
  }

  async getStatsByContainerId(containerId: string): Promise<CollectionStats[]> {
    return this.prisma.collectionStats.findMany({
      where: {
        containerId,
      },
    });
  }

  // Create CollectionStats
  async createCollectionStats(
    createCollectionStatDto: CreateCollectionStatDto,
  ) {
    const data = await this.prisma.collectionStats.create({
      data: {
        containerId: createCollectionStatDto.containerId,
        day: createCollectionStatDto.day,
        collections: createCollectionStatDto.collections,
      },
    });
    return data;
  }
}

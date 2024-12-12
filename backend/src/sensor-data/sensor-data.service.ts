import { Injectable } from '@nestjs/common';
import {
  CreateSensorDatumDto,
  GetSensorDataDto,
} from './dto/create-sensor-datum.dto';
import { UpdateSensorDatumDto } from './dto/update-sensor-datum.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SensorDataService {
  constructor(private prisma: PrismaService) {}
  async create(createSensorDatumDto: CreateSensorDatumDto) {
    const data = await this.prisma.sensorData.create({
      data: {
        containerId: createSensorDatumDto.containerId,
        location: {
          create: {
            latitude: createSensorDatumDto.location.latitude,
            longitude: createSensorDatumDto.location.longitude,
          },
        },
      },
    });
    return data;
  }

  findAll() {
    return this.prisma.sensorData.findMany({
      include: {
        location: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.sensorData.findUnique({
      where: {
        id,
      },
      include: {
        location: true,
      },
    });
  }

  async update(id: string, updateSensorDatumDto: UpdateSensorDatumDto) {
    return await this.prisma.sensorData.update({
      where: {
        id,
      },
      data: {
        containerId: updateSensorDatumDto.containerId,
        location: {
          update: {
            latitude: updateSensorDatumDto.location.latitude,
            longitude: updateSensorDatumDto.location.longitude,
          },
        },
      },
    });
  }

  remove(id: string) {
    return this.prisma.sensorData.delete({
      where: {
        id,
      },
    });
  }
}

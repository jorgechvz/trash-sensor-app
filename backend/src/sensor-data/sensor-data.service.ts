import { Injectable } from '@nestjs/common';
import {
  CreateSensorDatumDto,
  GetSensorDataDto,
} from './dto/create-sensor-datum.dto';
import { UpdateSensorDatumDto } from './dto/update-sensor-datum.dto';
import { PrismaService } from 'src/prisma.service';
import { SensorDataGateway } from './sensor-data.gateway'; // Importa el Gateway

@Injectable()
export class SensorDataService {
  constructor(
    private prisma: PrismaService,
    private sensorDataGateway: SensorDataGateway, // Inyecta el Gateway
  ) {}

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

    // Emitir evento de creación
    this.sensorDataGateway.emitSensorDataUpdate('sensorDataCreated', data);

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
      where: { id },
      include: { location: true },
    });
  }

  async update(id: string, updateSensorDatumDto: UpdateSensorDatumDto) {
    const updatedData = await this.prisma.sensorData.update({
      where: { id },
      data: {
        containerId: updateSensorDatumDto.containerId,
        temperature: updateSensorDatumDto.temperature,
        humidity: updateSensorDatumDto.humidity,
        carbonMonoxide: updateSensorDatumDto.carbonMonoxide,
        fillLevel: updateSensorDatumDto.fillLevel,
      },
      include: { location: true },
    });

    // Emitir evento de actualización
    this.sensorDataGateway.emitSensorDataUpdate(
      'sensorDataUpdated',
      updatedData,
    );

    return updatedData;
  }

  async remove(id: string) {
    const deletedData = await this.prisma.sensorData.delete({
      where: { id },
    });

    // Emitir evento de eliminación
    this.sensorDataGateway.emitSensorDataUpdate(
      'sensorDataDeleted',
      deletedData,
    );

    return deletedData;
  }
}

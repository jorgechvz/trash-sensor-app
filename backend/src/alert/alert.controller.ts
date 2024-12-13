import { Body, Controller, Post } from '@nestjs/common';
import { AlertService } from './alert.service';

@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Post()
  async receiveSensorData(@Body() data: any): Promise<string> {
    await this.alertService.processSensorData(data);
    return 'Datos procesados y alertas enviadas si era necesario.';
  }
}

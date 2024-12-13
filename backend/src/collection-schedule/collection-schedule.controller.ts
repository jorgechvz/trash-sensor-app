import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CollectionScheduleService } from './collection-schedule.service';
import {
  CreateCollectionScheduleDto,
  CreateCollectionStatDto,
} from './dto/create-collection-schedule.dto';
import { UpdateCollectionScheduleDto } from './dto/update-collection-schedule.dto';

@Controller('collection')
export class CollectionScheduleController {
  constructor(
    private readonly collectionScheduleService: CollectionScheduleService,
  ) {}

  @Post()
  create(@Body() createCollectionScheduleDto: CreateCollectionScheduleDto) {
    return this.collectionScheduleService.create(createCollectionScheduleDto);
  }

  @Get()
  findAll() {
    return this.collectionScheduleService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.collectionScheduleService.getStats();
  }

  @Post('stats')
  createStats(@Body() createCollectionStatDto: CreateCollectionStatDto) {
    return this.collectionScheduleService.createCollectionStats(
      createCollectionStatDto,
    );
  }

  @Get('stats/:id')
  getStatsByContainerId(@Param('id') id: string) {
    return this.collectionScheduleService.getStatsByContainerId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.collectionScheduleService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionScheduleDto: UpdateCollectionScheduleDto,
  ) {
    return this.collectionScheduleService.update(
      id,
      updateCollectionScheduleDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collectionScheduleService.remove(id);
  }
}

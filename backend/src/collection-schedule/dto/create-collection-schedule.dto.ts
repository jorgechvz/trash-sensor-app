export class CreateCollectionScheduleDto {
  containerId: string;
  scheduleAt: Date;
  status?: string;
}

export class CreateCollectionStatDto {
  containerId: string;
  day: string;
  collections: number;
}

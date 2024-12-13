export class GetSensorDataDto {
  id: string
  containerId: string;
  location: Location;
  fillLevel: number;
  temperature: number;
  humidity: number;
  carbonMonoxide: number;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateSensorDatumDto {
  containerId?: string;
  location?: Location;
  temperature?: number;
  humidity?: number;
  carbonMonoxide?: number;
  fillLevel? : number;
}

export class Location {
  id: string;
  latitude: number;
  longitude: number;
  sensorDataId: string;
}

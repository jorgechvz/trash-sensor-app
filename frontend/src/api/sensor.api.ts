import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export type SensorDataGetResponse = {
  id: string;
  containerId: string;
  fillLevel: number;
  temperature: number;
  humidity: number;
  carbonMonoxide: number;
  createdAt: string;
  updatedAt: string;
  location: {
    id: string;
    latitude: number;
    longitude: number;
    sensorDataId: string;
  };
};

export type SensorDataPostRequest = {
  containerId: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export const getSensorData = async () => {
  const response = await axios.get<SensorDataGetResponse[]>(`${API_URL}/sensor-data`);
  return response.data;
};

export const getSensorDataById = async (
  id: string
): Promise<SensorDataGetResponse> => {
  const response = await axios.get<SensorDataGetResponse>(`${API_URL}/sensor-data/${id}`);
  return response.data;
};

export const postSensorData = async (data: SensorDataPostRequest) => {
  const response = await axios.post(`${API_URL}/sensor-data`, data);
  return response.data;
};

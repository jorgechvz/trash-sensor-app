import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export type CollectionStats = {
  id: string;
  containerId: string;
  day: string;
  collections: number;
};

export type PostCollectionSchedule = {
  containerId: string;
  scheduleAt: Date;
  status?: string;
};

export type GetCollectionSchedule = {
  id: string;
  containerId: string;
  scheduledAt: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export const getCollectionsStats = async (): Promise<CollectionStats[]> => {
  const response = await axios.get(`${API_URL}/collection/stats`);
  return response.data;
};

export const getCollectionSchedule = async (
  id: string
): Promise<GetCollectionSchedule[]> => {
  const response = await axios.get<GetCollectionSchedule[]>(
    `${API_URL}/collection/${id}`
  );
  console.log(response.data);
  return response.data;
};

export const postCollectionSchedule = async (data: PostCollectionSchedule) => {
  const response = await axios.post(`${API_URL}/collection`, data);
  return response.data;
};

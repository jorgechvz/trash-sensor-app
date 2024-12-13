import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import {
  getSensorData,
  getSensorDataById,
  postSensorData,
  SensorDataPostRequest,
} from "@/api/sensor.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

let socket: Socket;

export const useSensor = (id?: string) => {
  const queryClient = useQueryClient();

  // Query para obtener todos los datos
  const getSensorDataQuery = useQuery({
    queryKey: ["sensor"],
    queryFn: getSensorData,
  });

  // Query para obtener un contenedor específico
  const getSensorDataByIdQuery = useQuery({
    queryKey: ["sensor", id],
    queryFn: () => getSensorDataById(id ?? ""),
    enabled: !!id, // Solo ejecuta la query si hay un ID
  });

  // Mutación para crear un contenedor
  const createSensorData = useMutation({
    mutationFn: async (data: SensorDataPostRequest) => {
      return await postSensorData(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sensor"] });
    },
  });

  // WebSocket para escuchar actualizaciones en tiempo real
  useEffect(() => {
    socket = io(import.meta.env.VITE_API_URL || "http://localhost:3001");

    socket.on("sensorDataUpdated", (updatedData) => {
      console.log("Datos actualizados recibidos:", updatedData);

      // Actualiza la caché de React Query
      queryClient.setQueryData(["sensor"], (oldData: any) =>
        oldData?.map((item: any) =>
          item.id === updatedData.id ? updatedData : item
        )
      );

      // Actualiza también la query específica si coincide el ID
      queryClient.setQueryData(["sensor", updatedData.id], updatedData);
    });

    socket.on("sensorDataCreated", (newData) => {
      console.log("Nuevo dato creado:", newData);

      queryClient.setQueryData(["sensor"], (oldData: any) => [
        ...(oldData || []),
        newData,
      ]);
    });

    socket.on("sensorDataDeleted", (deletedData) => {
      console.log("Dato eliminado:", deletedData);

      queryClient.setQueryData(["sensor"], (oldData: any) =>
        oldData?.filter((item: any) => item.id !== deletedData.id)
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);

  return {
    getSensorDataQuery,
    createSensorData,
    getSensorDataByIdQuery,
  };
};

import { Droplets, Thermometer, Trash, Wind } from "lucide-react";
import TrashContainer from "./trash-container";
import CardKpi from "./card-kpi";
import SelectButton from "./select-button";
import { lazy, Suspense, useState } from "react";
import { useSensor } from "../hooks/use-sensor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CollectionsStats } from "./collection";
import ScheduleCollection from "./schedule-collection";
import CollectionCard from "./schedule-collection-overview";
import { NewContainerDialog } from "./new-container";


const Map = lazy(() => import("../components/map"));

export default function HomeLayout() {
  const [selectedContainerId, setSelectedContainerId] = useState<string>("");
  const { getSensorDataByIdQuery } = useSensor(selectedContainerId);

  const containerData = getSensorDataByIdQuery.data;

  // Función para evitar mostrar null o undefined
  const safeValue = (value: any, suffix: string = "") =>
    value != null && value !== undefined
      ? `${value}${suffix}`
      : "Esperando datos...";

  const selectedBin = {
    id: selectedContainerId,
    lat: containerData?.location?.latitude || 0,
    lng: containerData?.location?.longitude || 0,
    fillLevel: containerData?.fillLevel || 0,
    status: "normal" as "normal" | "warning" | "critical",
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 min-h-screen bg-background">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Panel de Control
          </h1>
          <p className="text-muted-foreground">
            Monitoreo de Contenedores Inteligentes
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <SelectButton onSelect={setSelectedContainerId} />
          <NewContainerDialog />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <CardKpi
          title="Temperatura"
          value={safeValue(containerData?.temperature, "°C")}
          icon={Thermometer}
        />
        <CardKpi
          title="Humedad"
          value={safeValue(containerData?.humidity, "%")}
          icon={Droplets}
        />
        <CardKpi
          title="Monóxido de Carbono"
          value={safeValue(containerData?.carbonMonoxide, " ppm")}
          icon={Wind}
        />
        <CardKpi
          title="Nivel de llenado"
          value={safeValue(containerData?.fillLevel, "%")}
          icon={Trash}
        />
      </div>

      <div className="grid gap-x-4 md:grid-cols-2">
        <div className="col-span-1 md:row-span-2 border-2 rounded-lg">
          <div className="p-4 flex items-center justify-between">
            <div>
              <h2 className="font-bold">Estado del contenedor</h2>
              <span>
                {containerData
                  ? `${containerData.containerId}`
                  : "Seleccione un contenedor"}
              </span>
            </div>
            {containerData && containerData.fillLevel >= 100 && (
              <ScheduleCollection
                containerId={selectedContainerId}
                containerCode={containerData.containerId}
              />
            )}
          </div>
          <TrashContainer nivelLlenado={containerData?.fillLevel || 0} />
        </div>
        <Suspense fallback={<p>Cargando mapa...</p>}>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Ubicación del Contenedor</CardTitle>
              <CardDescription>
                Vista en tiempo real del contenedor seleccionado
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {containerData?.location ? (
                <Map bins={selectedBin} />
              ) : (
                <p>No hay datos de ubicación disponibles.</p>
              )}
            </CardContent>
          </Card>
        </Suspense>
      </div>
      <div className="col-span-1 flex gap-x-4">
        <CollectionsStats />
        <CollectionCard
          containerName={containerData?.containerId || ""}
          containerId={containerData?.id || ""}
        />
      </div>
      <div className="col-span-"></div>
    </div>
  );
}

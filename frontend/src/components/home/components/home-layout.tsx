import { Droplets, Thermometer, Trash, Wind } from "lucide-react";
import TrashContainer from "./trash-container";
import CardKpi from "./card-kpi";
import { Button } from "@/components/ui/button";
import SelectButton from "./select-button";
import HistoricMesurements from "./historic-mesurements";

export default function HomeLayout() {
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
          <SelectButton />
          <Button variant="default">Nuevo Contenedor</Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <CardKpi title="Temperatura" value="25°C" icon={Thermometer} />
        <CardKpi title="Humedad" icon={Droplets} />
        <CardKpi title="Monoxido de Carbono" value="80%" icon={Wind} />
        <CardKpi title="Nivel de llenado" value="60%" icon={Trash} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="col-span-1 md:row-span-2 border-2 rounded-lg">
          <div className="p-4">
            <h2 className="font-bold">Estado del contenedor</h2>
            <span>Contenedor 1</span>
          </div>
          <TrashContainer />
        </div>
        <div className="col-span-1">
          <HistoricMesurements selectedBin={{ historicalData: [] }} />
        </div>
      </div>
    </div>
  );
}

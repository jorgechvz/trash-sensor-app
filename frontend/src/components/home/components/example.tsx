import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Trash2,
  AlertTriangle,
  BarChart3,
  Calendar,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NewBinModal } from "./components/new-bin-modal";

const Map = dynamic(() => import("./map"), { ssr: false });

const bins = [
  {
    id: 1,
    name: "Contenedor 1",
    lat: -33.4569,
    lng: -70.6483,
    fillLevel: 100,
    temperature: 25,
    humidity: 50,
    co: 80,
    status: "critical",
  },
  {
    id: 2,
    name: "Contenedor 2",
    lat: -33.4589,
    lng: -70.6493,
    fillLevel: 75,
    status: "warning",
  },
  {
    id: 3,
    name: "Contenedor 3",
    lat: -33.4579,
    lng: -70.6473,
    fillLevel: 30,
    status: "normal",
  },
];

const historicalData = [
  { time: "00:00", temperature: 23, humidity: 45, co: 75, fill: 85 },
  { time: "04:00", temperature: 24, humidity: 48, co: 78, fill: 90 },
  { time: "08:00", temperature: 25, humidity: 50, co: 80, fill: 95 },
  { time: "12:00", temperature: 26, humidity: 52, co: 82, fill: 97 },
  { time: "16:00", temperature: 25, humidity: 50, co: 80, fill: 98 },
  { time: "20:00", temperature: 24, humidity: 49, co: 79, fill: 100 },
];

const weeklyData = [
  { day: "Lun", collections: 3 },
  { day: "Mar", collections: 2 },
  { day: "Mié", collections: 4 },
  { day: "Jue", collections: 3 },
  { day: "Vie", collections: 5 },
  { day: "Sáb", collections: 2 },
  { day: "Dom", collections: 1 },
];

export default function Dashboard() {
  const [selectedBin, setSelectedBin] = useState(bins[0]);

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8 min-h-screen bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Panel de Control
          </h1>
          <p className="text-muted-foreground">
            Monitoreo de Contenedores Inteligentes
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            onValueChange={(value) =>
              setSelectedBin(
                bins.find((bin) => bin.id === parseInt(value)) || bins[0]
              )
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar contenedor" />
            </SelectTrigger>
            <SelectContent>
              {bins.map((bin) => (
                <SelectItem key={bin.id} value={bin.id.toString()}>
                  {bin.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <NewBinModal />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperatura</CardTitle>
            <Thermometer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedBin.temperature
                ? `${selectedBin.temperature}°C`
                : "Esperando datos"}
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedBin.temperature
                ? "+2° desde última medición"
                : "Sin mediciones recientes"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Humedad</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedBin.humidity
                ? `${selectedBin.humidity}%`
                : "Esperando datos"}
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedBin.humidity
                ? "Normal para el ambiente"
                : "Sin mediciones recientes"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monóxido de Carbono
            </CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedBin.co ? `${selectedBin.co}%` : "Esperando datos"}
            </div>
            <Badge variant={selectedBin.co > 80 ? "destructive" : "secondary"}>
              {selectedBin.co > 80 ? "Nivel Alto" : "Nivel Normal"}
            </Badge>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Nivel de Llenado
            </CardTitle>
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedBin.fillLevel
                ? `${selectedBin.fillLevel}%`
                : "Esperando datos"}
            </div>
            <Badge
              variant={selectedBin.fillLevel > 80 ? "destructive" : "secondary"}
            >
              {selectedBin.fillLevel > 80 ? "Requiere Vaciado" : "Nivel Normal"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1 md:row-span-2">
          <CardHeader>
            <CardTitle>Estado del Contenedor</CardTitle>
            <CardDescription>{selectedBin.name}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <div className="relative w-48 h-64">
              <Image
                src="/placeholder.svg?height=256&width=192"
                alt="Basurero"
                layout="fill"
                objectFit="contain"
              />
              <div
                className="absolute inset-0 bg-red-500 opacity-50"
                style={{
                  clipPath: `inset(${100 - selectedBin.fillLevel}% 0 0 0)`,
                  transition: "clip-path 1s ease-in-out",
                }}
              />
            </div>
            <Progress value={selectedBin.fillLevel} className="w-full" />
            <p className="text-center text-sm text-muted-foreground">
              Nivel de llenado: {selectedBin.fillLevel}%
            </p>
            <Button>Programar Recolección</Button>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ubicación del Contenedor</CardTitle>
            <CardDescription>
              Vista en tiempo real del contenedor seleccionado
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <Map bins={[selectedBin]} />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Histórico de Mediciones</CardTitle>
            <CardDescription>Últimas 24 horas</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedBin.historicalData ? (
              <Tabs defaultValue="temperature" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="temperature">Temperatura</TabsTrigger>
                  <TabsTrigger value="humidity">Humedad</TabsTrigger>
                  <TabsTrigger value="co">CO</TabsTrigger>
                  <TabsTrigger value="fill">Llenado</TabsTrigger>
                </TabsList>
                <TabsContent value="temperature">
                  <ChartContainer
                    config={{
                      temperature: {
                        label: "Temperatura",
                        color: "hsl(var(--chart-1))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historicalData}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="temperature"
                          stroke="var(--color-temperature)"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>
                <TabsContent value="humidity">
                  <ChartContainer
                    config={{
                      humidity: {
                        label: "Humedad",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historicalData}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="humidity"
                          stroke="var(--color-humidity)"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                Esperando datos históricos...
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-semibold">
              Recolecciones Semanales
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="collections" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-semibold">
              Próximas Recolecciones
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Contenedor #1
                  </p>
                  <p className="text-sm text-muted-foreground">Hoy, 15:00</p>
                </div>
                <div className="ml-auto font-medium">Urgente</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Contenedor #2
                  </p>
                  <p className="text-sm text-muted-foreground">Mañana, 10:00</p>
                </div>
                <div className="ml-auto font-medium">Programado</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Contenedor #3
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Pasado mañana, 14:00
                  </p>
                </div>
                <div className="ml-auto font-medium">Programado</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

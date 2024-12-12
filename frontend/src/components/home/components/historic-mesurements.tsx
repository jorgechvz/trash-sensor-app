import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface HistoricMesurementsProps {
  selectedBin: {
    historicalData?: any;
  };
}
export default function HistoricMesurements({
  selectedBin,
}: HistoricMesurementsProps) {
  return (
    <Card>
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
                  <LineChart data={selectedBin.historicalData}>
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
                  <LineChart data={selectedBin.historicalData}>
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
  );
}

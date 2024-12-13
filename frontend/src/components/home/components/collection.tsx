import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Tooltip,
  XAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useCollectionStats } from "../hooks/use-collections";

const chartConfig = {
  collections: {
    label: "Recolecciones",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// Tooltip personalizado
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white shadow rounded-md border border-gray-200">
        <p className="text-sm font-semibold mb-1">{label}</p>
        <p className="text-sm text-gray-600">
          <span className="font-medium">Recolecciones:</span>{" "}
          <span className="font-bold ml-1">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
}

export function CollectionsStats() {
  const { collectionStatsQuery } = useCollectionStats();
  const { data: stats, isLoading, isError } = collectionStatsQuery;

  // Ordenar los datos por el orden de los días de la semana
  const dayOrder = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const sortedStats = stats
    ? [...stats].sort(
        (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
      )
    : [];

  if (isLoading) return <div>Cargando estadísticas...</div>;
  if (isError) return <div>Error al cargar los datos.</div>;

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Estadísticas de Recolecciones</CardTitle>
        <CardDescription>Últimos 7 días</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={sortedStats} // Usa los datos ordenados
            margin={{ top: 20 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Abreviar días (Mon -> Mon)
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="collections"
              fill="var(--color-collections)"
              radius={16}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

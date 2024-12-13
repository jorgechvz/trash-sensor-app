import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { formatDate } from "../utils/dateFormatter";
import { useCollectionStats } from "../hooks/use-collections";

interface CollectionCardProps {
  containerName: string;
  containerId: string;
}

export default function CollectionCard({
  containerName,
  containerId,
}: CollectionCardProps) {
  const { collectionScheduleQuery } = useCollectionStats(containerId);

  if (collectionScheduleQuery.isLoading) {
    return <div>Cargando estadísticas...</div>;
  }

  if (collectionScheduleQuery.isError) {
    return <div>Ocurrió un error al cargar las recolecciones</div>;
  }

  const collections = collectionScheduleQuery.data ?? [];

  if (collections.length === 0) {
    return <div>No hay datos para mostrar</div>;
  }
  const now = new Date();
  const filteredCollections = collections.filter(
    (collection) => new Date(collection.scheduledAt) >= now
  );

  // Ordenar las colecciones filtradas por fecha
  const sortedCollections = filteredCollections
    .slice(0,7)
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

  if (sortedCollections.length === 0) {
    return <div>No hay próximas recolecciones</div>;
  }

  return (
    <Card className="flex-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">
          Próximas Recolecciones
        </CardTitle>
        <CalendarIcon className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <h2 className="text-lg font-semibold mb-2">{containerName}</h2>
        {sortedCollections.map((collection) => (
          <div
            key={collection.id}
            className="flex items-center justify-between py-2 border-b last:border-b-0"
          >
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                {formatDate(collection.scheduledAt)}
              </p>
            </div>
            <div>
              <span
                className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                  collection.status === "Urgente"
                    ? "bg-red-50 text-red-700 ring-red-600/10"
                    : "bg-green-50 text-green-700 ring-green-600/10"
                }`}
              >
                {collection.status}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";

// Fix the default marker icon issue
const customIcon = new Icon({
  iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="41" viewBox="0 0 24 24" fill="red" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s-8-6.58-8-11.34a8 8 0 1 1 16 0C20 14.42 12 21 12 21z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    `)}`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Bin {
  id: string;
  lat: number;
  lng: number;
  fillLevel: number;
  status: "normal" | "warning" | "critical";
}

interface MapProps {
  bins: Bin;
}

function CenterMap({ bins }: { bins: Bin }) {
  const map = useMap();

  useEffect(() => {
    if (bins.lat !== undefined && bins.lng !== undefined) {
      map.setView([bins.lat, bins.lng], 15);
    }
  }, [bins, map]);

  return null; // Este componente no renderiza nada
}
export default function Map({ bins }: MapProps) {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={15}
      className="h-full w-full rounded-md z-0" 
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CenterMap bins={bins} />
      <Marker
        key={bins.id}
        position={[bins.lat || 0, bins.lng || 0]}
        icon={customIcon}
      >
        <Popup>
          <div className="p-2">
            <h3 className="font-semibold">Contenedor #{bins.id}</h3>
            <p className="text-sm">Nivel de llenado: {bins.fillLevel}%</p>
            <Badge
              variant={
                bins.status === "normal"
                  ? "destructive"
                  : bins.status === "warning"
                  ? "secondary"
                  : "default"
              }
            >
              {bins.status === "normal"
                ? "Crítico"
                : bins.status === "warning"
                ? "Precaución"
                : "Normal"}
            </Badge>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CardKpiProps {
  title: string;
  value?: string; 
  icon: LucideIcon;
}

export default function CardKpi({ title, value, icon: Icon }: CardKpiProps) {
  const displayValue = value?.trim() ? value : "Esperando datos...";

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon size={24} />
      </CardHeader>
      <CardContent>
        <div
          className={` ${!value?.trim() ? "text-md" : "text-2xl font-bold"}`}
        >
          {displayValue}
        </div>
      </CardContent>
    </Card>
  );
}

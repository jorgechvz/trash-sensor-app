import { Check, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useSensor } from "../hooks/use-sensor";

export default function SelectButton({
  onSelect,
}: {
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const { getSensorDataQuery } = useSensor();

  const containers = Array.isArray(getSensorDataQuery.data)
    ? getSensorDataQuery.data.map((sensor) => ({
        value: sensor.id,
        label: sensor.containerId,
      }))
    : [];

  useEffect(() => {
    if (containers.length > 0 && !value) {
      setValue(containers[0].value);
      onSelect(containers[0].value);
    }
  }, [containers]);

  return (
    <div className="space-y-2 w-[250px]">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value
                ? containers.find((c) => c.value === value)?.label
                : "Seleccionar contenedor"}
            </span>
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Buscar contenedor..." />
            <CommandList>
              <CommandEmpty>Contenedor no encontrado</CommandEmpty>
              <CommandGroup>
                {containers.map((container) => (
                  <CommandItem
                    key={container.value}
                    value={container.value}
                    onSelect={() => {
                      setValue(container.value);
                      onSelect(container.value);
                      setOpen(false);
                    }}
                  >
                    {container.label}
                    {value === container.value && (
                      <Check className="ml-auto" size={16} />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

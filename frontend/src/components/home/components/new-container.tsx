import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSensor } from "../hooks/use-sensor";
import { toast } from "@/hooks/use-toast";

// Esquema de validación con Zod
const formSchema = z.object({
  containerId: z.string().min(1, "Este campo es requerido"),
  latitude: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Math.abs(Number(val)) <= 90, {
      message: "Ingrese una latitud válida entre -90 y 90",
    }),
  longitude: z
    .string()
    .refine((val) => !isNaN(Number(val)) && Math.abs(Number(val)) <= 180, {
      message: "Ingrese una longitud válida entre -180 y 180",
    }),
});

type FormData = z.infer<typeof formSchema>;

export function NewContainerDialog() {
  const [open, setOpen] = useState(false);
  const { createSensorData } = useSensor();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema), // Conecta Zod con react-hook-form
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createSensorData.mutateAsync({
        containerId: data.containerId,
        location: {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude),
        },
      });
      toast({
        title: "Contenedor creado",
        description: "El nuevo contenedor ha sido creado exitosamente.",
      });
      setOpen(false);
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Hubo un problema al crear el contenedor. Por favor, intente de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Crear Nuevo Contenedor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Nuevo Contenedor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="containerId" className="text-right">
              ID
            </Label>
            <Input
              id="containerId"
              className="col-span-3"
              {...register("containerId")}
            />
            {errors.containerId && (
              <p className="col-span-3 col-start-2 text-sm text-red-500">
                {errors.containerId.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="latitude" className="text-right">
              Latitud
            </Label>
            <Input
              id="latitude"
              className="col-span-3"
              {...register("latitude")}
            />
            {errors.latitude && (
              <p className="col-span-3 col-start-2 text-sm text-red-500">
                {errors.latitude.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="longitude" className="text-right">
              Longitud
            </Label>
            <Input
              id="longitude"
              className="col-span-3"
              {...register("longitude")}
            />
            {errors.longitude && (
              <p className="col-span-3 col-start-2 text-sm text-red-500">
                {errors.longitude.message}
              </p>
            )}
          </div>
          <Button type="submit" className="ml-auto">
            Crear Contenedor
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

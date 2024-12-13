import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCollectionStats } from "../hooks/use-collections";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SmartDatetimeInput } from "@/components/ui/datetime-picker";

export const createCollectionSchema = z.object({
  scheduleAt: z.date({
    message: "La fecha es obligatoria y deben ser válida",
  }),
  status: z.string().optional(),
});

type CreateCollectionSchema = z.infer<typeof createCollectionSchema>;

export default function ScheduleCollection({
  containerId,
  containerCode,
}: {
  containerId: string;
  containerCode: string;
}) {
  const [open, setOpen] = useState(false);
  const form = useForm<CreateCollectionSchema>({
    resolver: zodResolver(createCollectionSchema),
    defaultValues: {
      scheduleAt: new Date(),
      status: "",
    },
  });
  const { collectionScheduleMutation } = useCollectionStats(containerId);
  const onSubmit = (data: z.infer<typeof createCollectionSchema>) => {
    collectionScheduleMutation.mutate(
      {
        containerId,
        scheduleAt: new Date(data.scheduleAt),
        status: data.status,
      },
      {
        onSuccess: () => {
          form.reset();
          setOpen(false);
        },
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Programar Recoleccion</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
            aria-hidden="true"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Crear nueva recoleccion
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              Programa una recolección para el contenedor {containerCode}
            </DialogDescription>
          </DialogHeader>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="scheduleAt"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Fecha de la recolección</FormLabel>
                      <SmartDatetimeInput
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="e.g. tomorrow at 5pm"
                      />
                      <FormDescription>
                        Esta fecha debe ser mayor a la fecha actual
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado de la recolección</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un estado" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Programado">Programado</SelectItem>
                          <SelectItem value="Urgente">Urgente</SelectItem>
                          <SelectItem value="Completado">Completado</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            {collectionScheduleMutation.isPending ? (
              <Button type="submit" className="w-full" disabled>
                Programando...
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Programar
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

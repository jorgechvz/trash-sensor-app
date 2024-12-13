export function formatDate(date: Date | string | undefined): string {
  if (!date) return "Fecha inválida"; // Manejar fechas no definidas
  
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "Fecha inválida"; // Manejar fechas no válidas

  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (parsedDate.toDateString() === now.toDateString()) {
    return `Hoy, ${parsedDate.getHours().toString().padStart(2, "0")}:${parsedDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } else if (parsedDate.toDateString() === tomorrow.toDateString()) {
    return `Mañana, ${parsedDate.getHours().toString().padStart(2, "0")}:${parsedDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${parsedDate.toLocaleDateString("es-ES", {
      weekday: "long",
      day: "numeric",
      month: "long",
    })}, ${parsedDate.getHours().toString().padStart(2, "0")}:${parsedDate
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }
}

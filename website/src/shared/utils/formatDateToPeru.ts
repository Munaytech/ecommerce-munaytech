export function formatDateToPeru(dateStr: string): string {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "America/Lima",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("es-PE", options).format(date);
}

// Ejemplo:
const fecha: string = "2025-05-03T16:27:49.950727Z";


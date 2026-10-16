export function formatDate(isoDate: string) {
  return new Date(isoDate).toLocaleString("ru-RU");
}

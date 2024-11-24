export function convertDuration(duration: string) {
  const totalSeconds = parseInt(duration.replace("s", ""), 10);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
}
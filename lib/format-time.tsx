import { intlFormatDistance } from "date-fns";

export function formatTime(timestamp: Date | null) {
  if (!timestamp) return "N/A";
  return intlFormatDistance(timestamp, new Date());
}

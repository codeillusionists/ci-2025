import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `$${price}`;
}

export function formatStudentCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

export function getCategoryColor(category: string): string {
  switch (category.toLowerCase()) {
    case "ai & ml":
      return "bg-purple-500/20 text-purple-400";
    case "cybersecurity":
      return "bg-red-500/20 text-red-400";
    case "web development":
      return "bg-green-500/20 text-green-400";
    case "data science":
      return "bg-blue-500/20 text-blue-400";
    case "cloud computing":
      return "bg-orange-500/20 text-orange-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
}

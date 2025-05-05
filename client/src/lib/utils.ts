import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number | string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return '₹0';
  }
  
  return `₹${numValue.toLocaleString('en-IN')}`;
}

export function calculateSolarSystem(monthlyBill: number, location: string) {
  // Simple calculation logic (in a real app, this would be more sophisticated)
  const systemSize = Math.ceil(monthlyBill / 1000); // kW
  const systemCost = systemSize * 70000;
  const monthlySavings = monthlyBill * 0.85;
  const annualSavings = monthlySavings * 12;
  const roi = (systemCost / annualSavings).toFixed(1);
  
  return {
    systemSize,
    systemCost,
    monthlySavings,
    annualSavings,
    roiPeriod: parseFloat(roi)
  };
}

export function getImageForCategory(category: string): string {
  const defaultImage = "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80";
  
  const categoryImages: Record<string, string> = {
    "Solar Panels": "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "Inverters": "https://images.unsplash.com/photo-1548075933-d9fc9cea6dc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "Batteries": "https://images.unsplash.com/photo-1584276433295-4b59fff8f591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "Complete Systems": "https://images.unsplash.com/photo-1611365892117-bce37392ba03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    "Accessories": "https://images.unsplash.com/photo-1545213156-0f5524058daa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
  };
  
  return categoryImages[category] || defaultImage;
}

// Function now moved to utils.tsx
export function getStarRating() {
  console.warn("getStarRating() has been moved to utils.tsx");
  return [];
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

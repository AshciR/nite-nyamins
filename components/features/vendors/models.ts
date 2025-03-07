interface Vendor {
  id: string;
  name: string;
  openingTime: string; // "09:00:00" format
  closingTime: string; // "18:00:00" format
  rating: number;
}

interface VendorWithMenu {
  vendor: Vendor;
  menu: Meal[];
}

interface Meal {
  id: string;
  name: string;
  price: number;
  currency: string;
  mealType: MealType;
}

type MealType = "chicken" | "pork" | "fish" | "vegetarian";

export type {MealType}
export {Vendor, VendorWithMenu, Meal}
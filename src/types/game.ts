export interface Item {
  id: string;
  name: string;
  basePrice: number;
  minPrice: number;
  maxPrice: number;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  prices: Record<string, number>;
}

export interface GameState {
  money: number;
  debt: number;
  day: number;
  currentLocation: string;
  inventory: Record<string, number>;
  health: number;
}

export interface PriceState {
  locations: Location[];
  items: Item[];
}
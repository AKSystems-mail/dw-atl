export interface Item {
  id: string;
  name: string;
  basePrice: number;
  minPrice: number;
  maxPrice: number;
}

export interface BookBag {
  id: string;
  name: string;
  capacity: number;
  price: number;
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
  bookBag: {
    capacity: number;
    currentSize: number;
  };
}

export interface PriceState {
  locations: Location[];
  items: Item[];
}
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

export interface Weapon {
  id: string;
  name: string;
  price: number;
  winChance: number;
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
  weapon: {
    id: string;
    name: string;
    winChance: number;
    cooldown: number;
  };
}

export interface PriceState {
  locations: Location[];
  items: Item[];
}

export interface TravelOption {
  id: string;
  name: string;
  getPrice: (fromLocation: string, toLocation: string) => number;
  available: (fromLocation: string, toLocation: string) => boolean;
  risk: {
    chance: number;
    type: string;
    escape?: {
      run?: { chance: number; penalty: { inventory: number; cash: number } };
      fight?: { chance: number; penalty: { inventory: number; cash: number } };
      bribe?: { chance: number; penalty: { inventory: number; cash: number } };
    };
  };
}

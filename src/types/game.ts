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
  settings: GameSettings;
}

export interface GameSettings {
  sound: boolean;
  volume: number;
  duration: number;
  difficulty: 'mount_paran' | 'east_atlanta' | 'hapeville';
}

export interface PriceState {
  locations: Location[];
  items: Item[];
}

export interface RiskPenalty {
  inventory: number | ((to: string) => number);
  cash: number | ((to: string) => number);
}

export interface RiskEscape {
  chance: number;
  penalty: RiskPenalty;
  requiresWeapon?: boolean;
}

export interface Risk {
  chance: number | ((from: string, to: string, gameState: GameState) => number);
  type: string | ((to: string) => string);
  escape?: {
    run?: RiskEscape;
    fight?: RiskEscape;
    bribe?: RiskEscape;
  };
  location?: string; // Specific location where this risk applies
  condition?: (gameState: GameState) => boolean; // Additional conditions for the risk
}

export interface TravelOption {
  id: string;
  name: string;
  getPrice: (fromLocation: string, toLocation: string) => number;
  available: (fromLocation: string, toLocation: string) => boolean;
  risk: Risk;
}

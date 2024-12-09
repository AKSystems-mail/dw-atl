import { Item, Location } from "../types/game";

export const INITIAL_MONEY = 2000;
export const INITIAL_DEBT = 5500;
export const GAME_LENGTH = 30;

export const items: Item[] = [
  {
    id: "item1",
    name: "Product A",
    basePrice: 100,
    minPrice: 50,
    maxPrice: 300,
  },
  {
    id: "item2",
    name: "Product B",
    basePrice: 300,
    minPrice: 150,
    maxPrice: 800,
  },
  {
    id: "item3",
    name: "Product C",
    basePrice: 1000,
    minPrice: 500,
    maxPrice: 2500,
  },
];

export const locations: Location[] = [
  {
    id: "midtown",
    name: "Midtown",
    description: "The heart of the city",
    prices: {},
  },
  {
    id: "buckhead",
    name: "Buckhead",
    description: "Upscale district",
    prices: {},
  },
  {
    id: "downtown",
    name: "Downtown",
    description: "Business district",
    prices: {},
  },
  {
    id: "littlefive",
    name: "Little Five Points",
    description: "Alternative culture hub",
    prices: {},
  },
];

export const generatePrices = () => {
  return locations.map(location => ({
    ...location,
    prices: Object.fromEntries(
      items.map(item => [
        item.id,
        Math.floor(
          item.basePrice * (0.5 + Math.random())
        ),
      ])
    ),
  }));
};
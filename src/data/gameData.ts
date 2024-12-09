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
    description: "Fox Theater and that rainbow crosswalk",
    prices: {},
  },
  {
    id: "buckhead",
    name: "Buckhead",
    description: "Old money and highrises",
    prices: {},
  },
  {
    id: "cobbcounty",
    name: "Cobb County",
    description: "Technically ITP, don't stay here long",
    prices: {},
  },
  {
    id: "littlefive",
    name: "Little Five Points",
    description: "Hipsters everywhere",
    prices: {},
  },
  {
    id: "decatur",
    name: "Decatur",
    description: "It's the souf side obviously",
    prices: {},
  },
  {
    id: "westend",
    name: "West End",
    description: "Historic neighborhood southwest of downtown",
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
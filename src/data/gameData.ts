import { Item, Location } from "../types/game";

export const INITIAL_MONEY = 2000;
export const INITIAL_DEBT = 5500;
export const GAME_LENGTH = 30;

export const items: Item[] = [
  {
    id: "blunts",
    name: "Blunts/Pre Rolls",
    basePrice: 60,
    minPrice: 40,
    maxPrice: 80,
  },
  {
    id: "oxy",
    name: "Oxy",
    basePrice: 10,
    minPrice: 5,
    maxPrice: 40,
  },
  {
    id: "shrooms",
    name: "Shrooms",
    basePrice: 150,
    minPrice: 100,
    maxPrice: 250,
  },
  {
    id: "powda",
    name: "Powda",
    basePrice: 120,
    minPrice: 60,
    maxPrice: 250,
  },
  {
    id: "acid",
    name: "Acid",
    basePrice: 15,
    minPrice: 5,
    maxPrice: 40,
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
    description: "Thriller without the music and dancing",
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
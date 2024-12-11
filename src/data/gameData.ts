import { Item, Location, BookBag, Weapon } from "../types/game";
export { travelOptions, locationRisks } from './travelData';

export const INITIAL_MONEY = 2000;
export const INITIAL_DEBT = 10000;
export const DAILY_INTEREST_RATE = 0.06;
export const GAME_LENGTH = 30;

export const bookBags: BookBag[] = [
  {
    id: "starter",
    name: "Starter Bookbag",
    capacity: 100,
    price: 0
  },
  {
    id: "medium",
    name: "Medium Bookbag",
    capacity: 250,
    price: 400
  },
  {
    id: "large",
    name: "Large Bookbag",
    capacity: 600,
    price: 1000
  },
  {
    id: "xl",
    name: "Extra Large Bookbag",
    capacity: 1000,
    price: 3000
  },
];

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
    description: "Hipsters everywhere. Only place to buy bigger bookbags.",
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

export const weapons: Weapon[] = [
  {
    id: "fists",
    name: "Fists",
    price: 0,
    winChance: 0.45
  },
  {
    id: "blicky",
    name: "Blicky",
    price: 300,
    winChance: 0.52
  },
  {
    id: "strap",
    name: "Strap",
    price: 550,
    winChance: 0.63
  },
  {
    id: "draco",
    name: "Draco",
    price: 3000,
    winChance: 0.77
  }
];

export const generatePrices = () => {
  return locations.map(location => {
    const availableItems = [...items]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 + Math.floor(Math.random() * 2));

    const prices = Object.fromEntries(
      availableItems.map(item => [
        item.id,
        Math.floor(item.basePrice * (0.5 + Math.random())),
      ])
    );

    return {
      ...location,
      prices,
    };
  });
};

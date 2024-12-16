import { Weapon } from "../types/game";

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
    winChance: 0.52,
    maxUses: 10
  },
  {
    id: "strap",
    name: "Strap",
    price: 550,
    winChance: 0.63,
    maxUses: 10
  },
  {
    id: "draco",
    name: "Draco",
    price: 3000,
    winChance: 0.77,
    maxUses: 10
  }
];
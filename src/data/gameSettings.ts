import { GameSettings } from "../types/game";

export const defaultSettings: GameSettings = {
  sound: true,
  duration: 30,
  difficulty: 'east_atlanta'
};

export const difficultySettings = {
  mount_paran: {
    initialMoney: 3000,
    initialDebt: 8000
  },
  east_atlanta: {
    initialMoney: 2000,
    initialDebt: 10000
  },
  hapeville: {
    initialMoney: 1000,
    initialDebt: 12000
  }
};
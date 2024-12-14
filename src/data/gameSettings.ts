import { GameSettings } from "../types/game";

export const defaultSettings: GameSettings = {
  sound: true,
  volume: 50,
  duration: 30,
  difficulty: 'east_atlanta'
};

export const difficultySettings = {
  mount_paran: {
    initialMoney: 6000,
    initialDebt: 8000
  },
  east_atlanta: {
    initialMoney: 4000,
    initialDebt: 10000
  },
  hapeville: {
    initialMoney: 4000,
    initialDebt: 12000
  }
};
import { useState } from "react";
import { GameState, Weapon } from "../types/game";
import { difficultySettings } from "../data/gameSettings";
import { defaultSettings } from "../data/gameSettings";
import { DAILY_INTEREST_RATE } from "../data/gameData";
import { toast } from "@/components/ui/use-toast";

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(() => ({
    money: difficultySettings.east_atlanta.initialMoney,
    debt: difficultySettings.east_atlanta.initialDebt,
    day: 1,
    currentLocation: "midtown",
    inventory: {},
    health: 100,
    bookBag: {
      capacity: 100,
      currentSize: 0,
    },
    weapon: {
      id: "fists",
      name: "Fists",
      winChance: 0.45,
      cooldown: 0
    },
    settings: defaultSettings,
  }));

  const handleBuyWeapon = (weapon: Weapon) => {
    if (gameState.money >= weapon.price) {
      setGameState(prev => ({
        ...prev,
        money: prev.money - weapon.price,
        weapon: {
          id: weapon.id,
          name: weapon.name,
          winChance: weapon.winChance,
          cooldown: 0,
          usesLeft: weapon.maxUses
        }
      }));
    }
  };

  const handleWeaponUse = () => {
    setGameState(prev => {
      if (prev.weapon.id === "fists" || !prev.weapon.usesLeft) {
        return prev;
      }

      const newUsesLeft = (prev.weapon.usesLeft || 0) - 1;

      if (newUsesLeft <= 0) {
        return {
          ...prev,
          weapon: {
            id: "fists",
            name: "Fists",
            winChance: 0.45,
            cooldown: 0
          }
        };
      }

      return {
        ...prev,
        weapon: {
          ...prev.weapon,
          usesLeft: newUsesLeft
        }
      };
    });
  };

  return {
    gameState,
    setGameState,
    handleBuyWeapon,
    handleWeaponUse
  };
};
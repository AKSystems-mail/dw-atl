import { useState } from "react";
import { GameState, Location, PriceState, Weapon, GameSettings as GameSettingsType } from "../types/game";
import { items, generatePrices, DAILY_INTEREST_RATE } from "../data/gameData";
import { toast } from "@/components/ui/use-toast";
import { GameLayout } from "../components/layout/GameLayout";
import { defaultSettings, difficultySettings } from "../data/gameSettings";

const Index = () => {
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

  const [priceState, setPriceState] = useState<PriceState>({
    locations: generatePrices(),
    items: items,
  });

  const handleTravel = (locationId: string) => {
    setGameState(prev => ({
      ...prev,
      currentLocation: locationId,
      day: prev.day + 1,
      debt: prev.debt > 0 ? Math.floor(prev.debt * (1 + DAILY_INTEREST_RATE)) : 0
    }));
    setPriceState(prev => ({
      ...prev,
      locations: generatePrices(),
    }));
    toast({
      title: "Traveled!",
      description: `You've arrived at ${locationId}`,
    });
  };

  const handleBuy = (itemId: string) => {
    const currentLocation = priceState.locations.find(
      loc => loc.id === gameState.currentLocation
    );
    if (!currentLocation) return;

    const price = currentLocation.prices[itemId];
    if (gameState.money < price) {
      toast({
        title: "Not Enough Money",
        description: `You need $${price} to buy this item.`,
      });
      return;
    }

    setGameState(prev => ({
      ...prev,
      money: Math.max(0, prev.money - price),
      inventory: {
        ...prev.inventory,
        [itemId]: (prev.inventory[itemId] || 0) + 1,
      },
      bookBag: {
        ...prev.bookBag,
        currentSize: prev.bookBag.currentSize + 1,
      },
    }));
  };

  const handleSell = (itemId: string) => {
    const currentLocation = priceState.locations.find(
      loc => loc.id === gameState.currentLocation
    );
    if (!currentLocation) return;

    const price = currentLocation.prices[itemId];
    if (!gameState.inventory[itemId] || gameState.inventory[itemId] <= 0) {
      toast({
        title: "No Items to Sell",
        description: "You don't have any of this item to sell.",
      });
      return;
    }

    setGameState(prev => ({
      ...prev,
      money: prev.money + price,
      inventory: {
        ...prev.inventory,
        [itemId]: prev.inventory[itemId] - 1,
      },
      bookBag: {
        ...prev.bookBag,
        currentSize: prev.bookBag.currentSize - 1,
      },
    }));

    toast({
      title: "Item Sold",
      description: `Sold for $${price}`,
    });
  };

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

      // If weapon is broken, revert to fists
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

      // Otherwise just decrement uses
      return {
        ...prev,
        weapon: {
          ...prev.weapon,
          usesLeft: newUsesLeft
        }
      };
    });
  };

  const handleSettingsChange = (newSettings: Partial<GameSettingsType>) => {
    setGameState(prev => {
      const updatedSettings = { ...prev.settings, ...newSettings };
      
      // Only reset game state if duration is changed
      if (newSettings.duration) {
        const difficultyConfig = difficultySettings[updatedSettings.difficulty];
        return {
          money: difficultyConfig.initialMoney,
          debt: difficultyConfig.initialDebt,
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
          settings: updatedSettings
        };
      }
      
      return {
        ...prev,
        settings: updatedSettings
      };
    });
  };

  const currentLocation = priceState.locations.find(
    loc => loc.id === gameState.currentLocation
  );

  return (
    <GameLayout
      gameState={gameState}
      setGameState={setGameState}
      locations={priceState.locations}
      currentLocation={currentLocation}
      onTravel={handleTravel}
      onBuy={handleBuy}
      onSell={handleSell}
      onBuyWeapon={handleBuyWeapon}
      onWeaponUse={handleWeaponUse}
    />
  );
};

export default Index;

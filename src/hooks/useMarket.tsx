import { useState } from "react";
import { GameState, PriceState } from "../types/game";
import { items, generatePrices } from "../data/gameData";
import { toast } from "@/components/ui/use-toast";

export const useMarket = (
  gameState: GameState,
  setGameState: (state: GameState | ((prev: GameState) => GameState)) => void
) => {
  const [priceState, setPriceState] = useState<PriceState>({
    locations: generatePrices(),
    items: items,
  });

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

  return {
    priceState,
    setPriceState,
    handleBuy,
    handleSell
  };
};
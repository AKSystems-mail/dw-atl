import { Button } from "@/components/ui/button";
import { GameState } from "../../types/game";
import { useState } from "react";

interface InventoryItemProps {
  itemId: string;
  itemName: string;
  owned: number;
  currentPrice: number;
  onBuy: () => void;
  onSell: () => void;
  gameState: GameState;
  bagCapacity: number;
  bagCurrentSize: number;
}

export const InventoryItem = ({
  itemName,
  owned,
  currentPrice,
  onBuy,
  onSell,
  gameState,
  bagCapacity,
  bagCurrentSize,
}: InventoryItemProps) => {
  const [showProfitIndicator, setShowProfitIndicator] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSellAll = () => {
    if (owned > 0) {
      for (let i = 0; i < owned; i++) {
        onSell();
      }
      setShowProfitIndicator(true);
      setTimeout(() => setShowProfitIndicator(false), 500);
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const handleBuy = () => {
    if (gameState.money >= currentPrice && bagCurrentSize < bagCapacity) {
      onBuy();
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const isBagFull = bagCurrentSize >= bagCapacity;
  const canAfford = gameState.money >= currentPrice;

  return (
    <div className={`relative flex justify-between items-center ${isShaking ? 'animate-shake' : ''}`}>
      {showProfitIndicator && (
        <div className="absolute -top-4 right-0 text-game-accent animate-money-up">
          +${currentPrice * owned}
        </div>
      )}
      <div>
        <div className="text-white">{itemName}</div>
        <div className="text-sm text-game-accent">
          Owned: {owned} | Price: ${currentPrice}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={handleBuy}
          disabled={!canAfford || isBagFull}
          className={`bg-game-accent hover:bg-game-accent/80 text-black transition-all duration-200
            ${canAfford && !isBagFull ? 'hover:scale-105' : 'opacity-50'}`}
          title={isBagFull ? "Bookbag is full" : !canAfford ? "Not enough money" : undefined}
        >
          Buy
        </Button>
        <Button
          onClick={onSell}
          disabled={owned === 0}
          className={`bg-game-accent2 hover:bg-game-accent2/80 text-white transition-all duration-200
            ${owned > 0 ? 'hover:scale-105' : 'opacity-50'}`}
        >
          Sell
        </Button>
        <Button
          onClick={handleSellAll}
          disabled={owned === 0}
          className={`bg-game-accent2 hover:bg-game-accent2/80 text-white transition-all duration-200
            ${owned > 0 ? 'hover:scale-105 animate-glow' : 'opacity-50'}`}
        >
          Sell All
        </Button>
      </div>
    </div>
  );
};
import { Button } from "@/components/ui/button";
import { GameState } from "../../types/game";

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
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="text-white">{itemName}</div>
        <div className="text-sm text-game-accent">
          Owned: {owned} | Price: ${currentPrice}
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onBuy}
          disabled={gameState.money < currentPrice || bagCurrentSize >= bagCapacity}
          className="bg-game-accent hover:bg-game-accent/80 text-black"
        >
          Buy
        </Button>
        <Button
          onClick={onSell}
          disabled={owned === 0}
          className="bg-game-accent2 hover:bg-game-accent2/80 text-white"
        >
          Sell
        </Button>
      </div>
    </div>
  );
};
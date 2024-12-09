import { GameState, Item } from "../types/game";
import { Button } from "@/components/ui/button";

interface InventoryProps {
  gameState: GameState;
  items: Item[];
  locationPrices: Record<string, number>;
  onBuy: (itemId: string) => void;
  onSell: (itemId: string) => void;
}

export const Inventory = ({ gameState, items, locationPrices, onBuy, onSell }: InventoryProps) => {
  return (
    <div className="bg-game-card p-4 rounded-lg">
      <h3 className="text-lg font-bold text-white mb-4">Inventory</h3>
      <div className="space-y-4">
        {items.map((item) => {
          const owned = gameState.inventory[item.id] || 0;
          const currentPrice = locationPrices[item.id];
          
          return (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <div className="text-white">{item.name}</div>
                <div className="text-sm text-game-accent">
                  Owned: {owned} | Price: ${currentPrice}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onBuy(item.id)}
                  disabled={gameState.money < currentPrice}
                  className="bg-game-accent hover:bg-game-accent/80 text-black"
                >
                  Buy
                </Button>
                <Button
                  onClick={() => onSell(item.id)}
                  disabled={owned === 0}
                  className="bg-game-accent2 hover:bg-game-accent2/80 text-white"
                >
                  Sell
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
import { GameState, Item } from "../types/game";
import { Button } from "./ui/button";

interface InventoryProps {
  gameState: GameState;
  items: Item[];
  locationPrices: Record<string, number>;
  onBuy: (itemId: string) => void;
  onSell: (itemId: string) => void;
}

export const Inventory = ({
  gameState,
  items,
  locationPrices,
  onBuy,
  onSell,
}: InventoryProps) => {
  const handleSellAll = (itemId: string) => {
    const quantity = gameState.inventory[itemId] || 0;
    for (let i = 0; i < quantity; i++) {
      onSell(itemId);
    }
  };

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const quantity = gameState.inventory[item.id] || 0;
        return (
          <div
            key={item.id}
            className="flex justify-between items-center bg-game-secondary/20 p-2 rounded"
          >
            <div className="flex-1">
              <div className="text-white">{item.name}</div>
              <div className="text-sm text-game-accent">
                Price: ${locationPrices[item.id]}
              </div>
              <div className="text-sm text-gray-400">Owned: {quantity}</div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => onBuy(item.id)}
                variant="secondary"
                className="bg-game-accent hover:bg-game-accent/80 text-black"
              >
                Buy
              </Button>
              {quantity > 0 && (
                <>
                  <Button
                    onClick={() => onSell(item.id)}
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Sell
                  </Button>
                  <Button
                    onClick={() => handleSellAll(item.id)}
                    variant="destructive"
                    className="bg-red-700 hover:bg-red-800"
                  >
                    Sell All
                  </Button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
import { Location } from "../types/game";
import { motion } from "framer-motion";
import { InventoryItem } from "./market/InventoryItem";
import { GameState } from "../types/game";

interface LocationPricesProps {
  location: Location;
  isCurrentLocation: boolean;
  gameState: GameState;
  onBuy: (itemId: string) => void;
  onSell: (itemId: string) => void;
}

export const LocationPrices = ({ 
  location, 
  isCurrentLocation,
  gameState,
  onBuy,
  onSell
}: LocationPricesProps) => {
  if (!isCurrentLocation) {
    return null;
  }

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold text-game-accent mb-2">Current Market Prices</h4>
      <div className="space-y-3">
        {Object.entries(location.prices).map(([itemId, price], index) => (
          <motion.div
            key={itemId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-game-background/50 p-2 rounded-md"
          >
            <InventoryItem
              itemId={itemId}
              itemName={itemId}
              owned={gameState.inventory[itemId] || 0}
              currentPrice={price}
              onBuy={() => onBuy(itemId)}
              onSell={() => onSell(itemId)}
              gameState={gameState}
              bagCapacity={gameState.bookBag.capacity}
              bagCurrentSize={gameState.bookBag.currentSize}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
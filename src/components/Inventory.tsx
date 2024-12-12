import { GameState, Item } from "../types/game";
import { bookBags } from "../data/gameData";
import { InventoryItem } from "./market/InventoryItem";
import { BookBagUpgrade } from "./inventory/BookBagUpgrade";
import { InventoryHeader } from "./inventory/InventoryHeader";

interface InventoryProps {
  gameState: GameState;
  items: Item[];
  locationPrices: Record<string, number>;
  onBuy: (itemId: string) => void;
  onSell: (itemId: string) => void;
}

export const Inventory = ({ gameState, items, locationPrices, onBuy, onSell }: InventoryProps) => {
  const canBuyBookBag = gameState.currentLocation === "littlefive";
  const currentBagIndex = bookBags.findIndex(bag => bag.capacity === gameState.bookBag.capacity);
  const nextBag = bookBags[currentBagIndex + 1];

  const availableItems = items.filter(item => locationPrices[item.id] !== undefined);

  return (
    <div className="bg-game-card p-4 rounded-lg">
      <InventoryHeader
        currentSize={gameState.bookBag.currentSize}
        capacity={gameState.bookBag.capacity}
      />

      <BookBagUpgrade
        gameState={gameState}
        nextBag={nextBag}
        canBuyBookBag={canBuyBookBag}
      />

      <div className="space-y-4">
        {availableItems.map((item) => (
          <InventoryItem
            key={item.id}
            itemId={item.id}
            itemName={item.name}
            owned={gameState.inventory[item.id] || 0}
            currentPrice={locationPrices[item.id]}
            onBuy={() => onBuy(item.id)}
            onSell={() => onSell(item.id)}
            gameState={gameState}
            bagCapacity={gameState.bookBag.capacity}
            bagCurrentSize={gameState.bookBag.currentSize}
          />
        ))}
      </div>
    </div>
  );
};
import { GameState, Item, BookBag } from "../types/game";
import { Button } from "@/components/ui/button";
import { bookBags } from "../data/gameData";
import { toast } from "@/components/ui/use-toast";

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

  const handleBuy = (itemId: string) => {
    const price = locationPrices[itemId];
    
    if (gameState.money < price) {
      toast({
        title: "Not Enough Money",
        description: `You need $${price} to buy this item.`,
      });
      return;
    }

    if (gameState.bookBag.currentSize >= gameState.bookBag.capacity) {
      toast({
        title: "Inventory Full",
        description: "Your bookbag is full! Sell items or upgrade your bag in Little Five Points.",
      });
      return;
    }
    onBuy(itemId);
  };

  const handleSell = (itemId: string) => {
    const owned = gameState.inventory[itemId] || 0;
    if (owned <= 0) {
      toast({
        title: "No Items to Sell",
        description: "You don't have any of this item to sell.",
      });
      return;
    }
    onSell(itemId);
  };

  return (
    <div className="bg-game-card p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-white">Inventory</h3>
        <div className="text-sm text-game-accent">
          Capacity: {gameState.bookBag.currentSize} / {gameState.bookBag.capacity}
        </div>
      </div>

      {canBuyBookBag && nextBag && (
        <div className="mb-4 p-2 border border-game-accent rounded-lg">
          <div className="text-white text-sm mb-2">
            Upgrade available: {nextBag.name}
          </div>
          <div className="flex justify-between items-center">
            <div className="text-game-accent text-sm">
              Capacity: {nextBag.capacity} | Price: ${nextBag.price}
            </div>
            <Button
              onClick={() => {
                if (gameState.money >= nextBag.price) {
                  // Handle upgrade logic in parent component
                  toast({
                    title: "Bookbag Upgraded",
                    description: `You now have a ${nextBag.name} with ${nextBag.capacity} capacity!`,
                  });
                } else {
                  toast({
                    title: "Not Enough Money",
                    description: "You can't afford this upgrade yet.",
                  });
                }
              }}
              disabled={gameState.money < nextBag.price}
              className="bg-game-accent hover:bg-game-accent/80 text-black"
            >
              Upgrade
            </Button>
          </div>
        </div>
      )}

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
                  onClick={() => handleBuy(item.id)}
                  disabled={gameState.money < currentPrice || gameState.bookBag.currentSize >= gameState.bookBag.capacity}
                  className="bg-game-accent hover:bg-game-accent/80 text-black"
                >
                  Buy
                </Button>
                <Button
                  onClick={() => handleSell(item.id)}
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
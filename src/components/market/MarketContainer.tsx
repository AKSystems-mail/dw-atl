import { GameState, Item } from "../../types/game";
import { Inventory } from "../Inventory";
import { WeaponsShop } from "../WeaponsShop";

interface MarketContainerProps {
  gameState: GameState;
  currentLocationPrices: Record<string, number>;
  items: Item[];
  onBuy: (itemId: string) => void;
  onSell: (itemId: string) => void;
  onBuyWeapon: (weapon: any) => void;
}

export const MarketContainer = ({
  gameState,
  currentLocationPrices,
  items,
  onBuy,
  onSell,
  onBuyWeapon,
}: MarketContainerProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-game-card border-t border-game-accent/20 p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-4">Market</h2>
        <div className="max-h-[40vh] overflow-y-auto scrollbar-thin scrollbar-thumb-game-accent scrollbar-track-game-background">
          <Inventory
            gameState={gameState}
            items={items}
            locationPrices={currentLocationPrices}
            onBuy={onBuy}
            onSell={onSell}
          />
          <WeaponsShop
            gameState={gameState}
            onBuyWeapon={onBuyWeapon}
          />
        </div>
      </div>
    </div>
  );
};
import { GameState, Item } from "../../types/game";
import { WeaponsShop } from "../WeaponsShop";
import { Weapon } from "../../types/game";

interface MarketContainerProps {
  gameState: GameState;
  currentLocationPrices: Record<string, number>;
  items: Item[];
  onBuy: (itemId: string) => void;
  onSell: (itemId: string) => void;
  onBuyWeapon: (weapon: Weapon) => void;
  onWeaponUse: () => void;
}

export const MarketContainer = ({
  gameState,
  currentLocationPrices,
  items,
  onBuy,
  onSell,
  onBuyWeapon,
  onWeaponUse,
}: MarketContainerProps) => {
  return (
    <div>
      <WeaponsShop 
        gameState={gameState} 
        onBuyWeapon={onBuyWeapon}
        onWeaponUse={onWeaponUse}
      />
      <div className="mt-4">
        <h3 className="text-lg font-bold text-white mb-4">Market Items</h3>
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="text-white">{item.name}</div>
              <div className="text-sm text-game-accent">Price: ${currentLocationPrices[item.id]}</div>
              <button
                onClick={() => onBuy(item.id)}
                className="bg-game-accent hover:bg-game-accent/80 text-black px-4 py-2 rounded"
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

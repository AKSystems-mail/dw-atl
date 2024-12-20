import { GameState, Item } from "../../types/game";
import { WeaponsShop } from "../WeaponsShop";
import { Weapon } from "../../types/game";
import { Inventory } from "../Inventory";

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
        <Inventory
          gameState={gameState}
          items={items}
          locationPrices={currentLocationPrices}
          onBuy={onBuy}
          onSell={onSell}
        />
      </div>
    </div>
  );
};
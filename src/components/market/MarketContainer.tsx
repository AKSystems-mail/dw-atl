import { GameState, Item } from "../../types/game";
import { WeaponsShop } from "../WeaponsShop";
import { Weapon } from "../../types/game";
import { Inventory } from "../Inventory";

interface MarketContainerProps {
  gameState: GameState;
  items: Item[];
  currentLocationPrices: Record<string, number>;
  onBuy: (itemId: string) => void;
  onSell: (itemId: string) => void;
  onBuyWeapon: (weapon: Weapon) => void;
}

export const MarketContainer = ({
  gameState,
  items,
  currentLocationPrices,
  onBuy,
  onSell,
  onBuyWeapon,
}: MarketContainerProps) => {
  if (!items || !currentLocationPrices) {
    return <div className="text-white">Loading market data...</div>;
  }

  return (
    <div className="p-4 bg-game-primary rounded-lg">
      <WeaponsShop
        money={gameState.money}
        onBuyWeapon={onBuyWeapon}
        currentWeapon={gameState.weapon}
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
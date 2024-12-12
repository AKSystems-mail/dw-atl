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
    <div>
      <h2 className="text-xl font-bold text-white mb-4">Market</h2>
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
  );
};
import { StatsBar } from "../StatsBar";
import { LocationsContainer } from "../locations/LocationsContainer";
import { MarketContainer } from "../market/MarketContainer";
import { GameState, Location } from "../../types/game";
import { Weapon } from "../../types/game";
import { items } from "../../data/items";

interface GameLayoutProps {
  gameState: GameState;
  setGameState: (state: GameState | ((prev: GameState) => GameState)) => void;
  locations: Location[];
  currentLocation: Location | undefined;
  onTravel: (locationId: string) => void;
  onBuy: (itemId: string) => void;
  onSell: (itemId: string) => void;
  onBuyWeapon: (weapon: Weapon) => void;
  onWeaponUse: () => void;
}

export const GameLayout = ({
  gameState,
  setGameState,
  locations,
  currentLocation,
  onTravel,
  onBuy,
  onSell,
  onBuyWeapon,
  onWeaponUse,
}: GameLayoutProps) => {
  return (
    <div className="min-h-screen bg-game-background pb-[50vh]">
      <StatsBar gameState={gameState} />
      <div className="p-4 pt-24">
        <div className="space-y-4">
          <LocationsContainer
            locations={locations}
            currentLocation={gameState.currentLocation}
            onTravel={onTravel}
            gameState={gameState}
            setGameState={setGameState}
          />
          {currentLocation && (
            <MarketContainer
              gameState={gameState}
              currentLocationPrices={currentLocation.prices}
              items={items}
              onBuy={onBuy}
              onSell={onSell}
              onBuyWeapon={onBuyWeapon}
              onWeaponUse={onWeaponUse}
            />
          )}
        </div>
      </div>
    </div>
  );
};
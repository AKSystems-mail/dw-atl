import { StatsBar } from "../StatsBar";
import { MarketContainer } from "../market/MarketContainer";
import { GameState, Location } from "../../types/game";
import { Weapon } from "../../types/game";
import { items } from "../../data/items";
import { AtlantaMap } from "../map/AtlantaMap";
import { LocationCard } from "../locations/LocationCard";
import { useState } from "react";

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
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    if (locationId !== gameState.currentLocation) {
      // Show travel dialog through LocationCard
      const location = locations.find(loc => loc.id === locationId);
      if (location) {
        setSelectedLocation(locationId);
      }
    }
  };

  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

  return (
    <div className="min-h-screen bg-game-background pb-[50vh]">
      <StatsBar gameState={gameState} />
      <div className="p-4 pt-24">
        <div className="space-y-4">
          <AtlantaMap
            locations={locations}
            currentLocation={gameState.currentLocation}
            onLocationSelect={handleLocationSelect}
          />
          
          {selectedLocationData && (
            <LocationCard
              location={selectedLocationData}
              currentLocation={gameState.currentLocation}
              onTravel={onTravel}
              gameState={gameState}
              setGameState={setGameState}
              onBuy={onBuy}
              onSell={onSell}
            />
          )}

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
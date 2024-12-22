import { GameState, Location } from "../../types/game";
import { LocationCard } from "../LocationCard";

interface LocationsContainerProps {
  locations: Location[];
  currentLocation: string;
  onTravel: (locationId: string) => void;
  gameState: GameState;
  setGameState: (state: GameState | ((prev: GameState) => GameState)) => void;
  onBuy: (itemId: string) => void;
  onSell: (itemId: string) => void;
}

export const LocationsContainer = ({
  locations,
  currentLocation,
  onTravel,
  gameState,
  setGameState,
  onBuy,
  onSell,
}: LocationsContainerProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">Locations</h2>
      {locations.map(location => (
        <LocationCard
          key={location.id}
          location={location}
          currentLocation={currentLocation}
          onTravel={onTravel}
          gameState={gameState}
          setGameState={setGameState}
          onBuy={onBuy}
          onSell={onSell}
        />
      ))}
    </div>
  );
};
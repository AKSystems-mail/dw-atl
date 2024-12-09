import { Location } from "../types/game";
import { Button } from "@/components/ui/button";

interface LocationCardProps {
  location: Location;
  currentLocation: string;
  onTravel: (locationId: string) => void;
}

export const LocationCard = ({ location, currentLocation, onTravel }: LocationCardProps) => {
  const isCurrentLocation = location.id === currentLocation;
  
  return (
    <div className={`bg-game-card p-4 rounded-lg mb-4 ${isCurrentLocation ? 'border-2 border-game-accent' : ''}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-white">{location.name}</h3>
        {!isCurrentLocation && (
          <Button 
            onClick={() => onTravel(location.id)}
            className="bg-game-accent hover:bg-game-accent/80 text-black"
          >
            Travel
          </Button>
        )}
      </div>
      <p className="text-sm text-gray-400">{location.description}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {Object.entries(location.prices).map(([itemId, price]) => (
          <div key={itemId} className="text-sm">
            <span className="text-game-accent2">{itemId}:</span>
            <span className="text-white ml-2">${price}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
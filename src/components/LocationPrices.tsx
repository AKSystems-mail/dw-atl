import { Location } from "../types/game";

interface LocationPricesProps {
  location: Location;
  isCurrentLocation: boolean;
}

export const LocationPrices = ({ location, isCurrentLocation }: LocationPricesProps) => {
  if (!isCurrentLocation) {
    return null;
  }

  return (
    <div className="mt-4 grid grid-cols-2 gap-2">
      {Object.entries(location.prices).map(([itemId, price]) => (
        <div key={itemId} className="text-sm">
          <span className="text-game-accent2">{itemId}:</span>
          <span className="text-white ml-2">${price}</span>
        </div>
      ))}
    </div>
  );
};
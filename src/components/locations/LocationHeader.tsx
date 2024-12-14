import { Location } from "../../types/game";

interface LocationHeaderProps {
  location: Location;
  isCurrentLocation: boolean;
}

export const LocationHeader = ({ location, isCurrentLocation }: LocationHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white group-hover:text-game-accent transition-colors">
          {location.name}
        </h3>
        <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
          {location.description}
        </p>
      </div>
      {isCurrentLocation && (
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-game-accent rounded-full animate-pulse" />
          <span className="text-xs text-game-accent">Current</span>
        </div>
      )}
    </div>
  );
};
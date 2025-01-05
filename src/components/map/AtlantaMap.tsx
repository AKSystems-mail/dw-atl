import { Location } from "../../types/game";
import { motion } from "framer-motion";
import { TravelDialog } from "../TravelDialog";
import { useState } from "react";
import { travelOptions } from "../../data/travelData";

interface AtlantaMapProps {
  locations: Location[];
  currentLocation: string;
  onLocationSelect: (locationId: string) => void;
  onTravel: (locationId: string, travelMethod: string) => void;
  gameState: any;
  setGameState: any;
}

interface LocationPoint {
  id: string;
  x: number;
  y: number;
}

const locationPoints: LocationPoint[] = [
  { id: "cobbcounty", x: 100, y: 150 },
  { id: "buckhead", x: 280, y: 150 },
  { id: "midtown", x: 300, y: 250 },
  { id: "littlefive", x: 380, y: 280 },
  { id: "decatur", x: 450, y: 280 },
  { id: "westend", x: 280, y: 350 },
];

export const AtlantaMap = ({ 
  locations, 
  currentLocation, 
  onLocationSelect,
  onTravel,
  gameState,
  setGameState
}: AtlantaMapProps) => {
  const [showTravelDialog, setShowTravelDialog] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [rydeCooldown, setRydeCooldown] = useState(0);

  const handleLocationClick = (locationId: string) => {
    if (locationId === currentLocation) {
      onLocationSelect(locationId);
      return;
    }
    setSelectedLocation(locationId);
    setShowTravelDialog(true);
  };

  const handleTravel = (option: any) => {
    if (!selectedLocation) return;
    onTravel(selectedLocation, option.id);
    setShowTravelDialog(false);
  };

  return (
    <div className="w-full bg-game-background rounded-lg p-4 relative">
      <svg
        viewBox="0 0 600 500"
        className="w-full h-auto"
        style={{ maxHeight: "70vh" }}
      >
        {/* Background Map Image */}
        <image 
          href="/lovable-uploads/7fed408a-3c16-43a5-9987-55627a244a33.png" 
          x="0" 
          y="0" 
          width="600" 
          height="500" 
          opacity="1"
        />

        {/* Location Markers */}
        <g className="locations">
          {locationPoints.map((point) => (
            <motion.circle
              key={point.id}
              cx={point.x}
              cy={point.y}
              r="12"
              className={`cursor-pointer ${
                currentLocation === point.id
                  ? "fill-game-accent stroke-white stroke-2"
                  : "fill-game-card hover:fill-game-accent/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLocationClick(point.id)}
            />
          ))}
        </g>
      </svg>

      {showTravelDialog && selectedLocation && (
        <TravelDialog
          open={showTravelDialog}
          onOpenChange={setShowTravelDialog}
          travelOptions={travelOptions}
          onTravel={handleTravel}
          currentLocation={currentLocation}
          destinationId={selectedLocation}
          rydeCooldown={rydeCooldown}
        />
      )}
    </div>
  );
};
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
  name: string;
  x: number;
  y: number;
}

const locationPoints: LocationPoint[] = [
  { id: "cobbcounty", name: "Cobb County", x: 100, y: 150 },
  { id: "buckhead", name: "Buckhead", x: 280, y: 150 },
  { id: "midtown", name: "Midtown", x: 300, y: 250 },
  { id: "littlefive", name: "Little Five Points", x: 380, y: 280 },
  { id: "decatur", name: "Decatur", x: 450, y: 280 },
  { id: "westend", name: "West End", x: 280, y: 350 },
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
        {/* Highways */}
        <g className="highways">
          {/* I-285 Perimeter */}
          <path
            d="M 100,100 C 200,100 400,100 500,100 C 500,200 500,300 500,400 C 400,400 200,400 100,400 C 100,300 100,200 100,100"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="8"
            className="opacity-70"
          />
          
          {/* I-75 */}
          <path
            d="M 100,50 L 280,150"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="8"
            className="opacity-70"
          />
          
          {/* I-85 */}
          <path
            d="M 500,50 L 280,150"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="8"
            className="opacity-70"
          />
          
          {/* I-20 */}
          <path
            d="M 50,300 L 550,300"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="8"
            className="opacity-70"
          />

          {/* Highway Labels */}
          <g className="highway-labels">
            <image href="/lovable-uploads/7fed408a-3c16-43a5-9987-55627a244a33.png" x="0" y="0" width="600" height="500" opacity="0.3" />
          </g>
        </g>

        {/* Location Markers */}
        <g className="locations">
          {locationPoints.map((point) => (
            <g key={point.id} onClick={() => handleLocationClick(point.id)}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="15"
                className={`cursor-pointer ${
                  currentLocation === point.id
                    ? "fill-game-accent stroke-white"
                    : "fill-game-card hover:fill-game-accent/50"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              />
              <text 
                x={point.x + 25} 
                y={point.y + 5} 
                className="fill-white text-sm font-bold"
                style={{ userSelect: "none" }}
              >
                {point.name}
              </text>
            </g>
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
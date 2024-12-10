import { Location } from "../types/game";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface LocationCardProps {
  location: Location;
  currentLocation: string;
  onTravel: (locationId: string) => void;
}

interface TravelOption {
  id: string;
  name: string;
  getPrice: (fromLocation: string, toLocation: string) => number;
  available: (fromLocation: string, toLocation: string) => boolean;
}

const travelOptions: TravelOption[] = [
  {
    id: "marta",
    name: "MARTA",
    getPrice: () => 5,
    available: (from, to) => {
      return !([from, to].includes("cobbcounty"));
    },
  },
  {
    id: "ryde",
    name: "Ryde",
    getPrice: (from, to) => {
      if (from === "cobbcounty" || to === "cobbcounty") {
        return 60;
      }
      return 25;
    },
    available: () => true,
  },
  {
    id: "drive",
    name: "Drive",
    getPrice: (from, to) => {
      if (from === "cobbcounty" || to === "cobbcounty") {
        return 30;
      }
      return 20;
    },
    available: () => true,
  },
];

export const LocationCard = ({ location, currentLocation, onTravel }: LocationCardProps) => {
  const [showTravelOptions, setShowTravelOptions] = useState(false);
  const isCurrentLocation = location.id === currentLocation;
  
  const handleTravel = (cost: number) => {
    onTravel(location.id);
    setShowTravelOptions(false);
  };

  return (
    <div className={`bg-game-card p-4 rounded-lg mb-4 ${isCurrentLocation ? 'border-2 border-game-accent' : ''}`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-white">{location.name}</h3>
        {!isCurrentLocation && (
          <Button 
            onClick={() => setShowTravelOptions(true)}
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

      <Dialog open={showTravelOptions} onOpenChange={setShowTravelOptions}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose Travel Option to {location.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {travelOptions.map((option) => {
              if (!option.available(currentLocation, location.id)) return null;
              const price = option.getPrice(currentLocation, location.id);
              return (
                <Button
                  key={option.id}
                  onClick={() => handleTravel(price)}
                  className="w-full justify-between"
                  variant="outline"
                >
                  <span>{option.name}</span>
                  <span>${price}</span>
                </Button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
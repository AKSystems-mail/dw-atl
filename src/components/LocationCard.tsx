import { Location } from "../types/game";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { GameState } from "../types/game";

interface LocationCardProps {
  location: Location;
  currentLocation: string;
  onTravel: (locationId: string, travelMethod: string) => void;
  gameState: GameState;
  setGameState: (state: GameState | ((prev: GameState) => GameState)) => void;
}

interface TravelOption {
  id: string;
  name: string;
  getPrice: (fromLocation: string, toLocation: string) => number;
  available: (fromLocation: string, toLocation: string) => boolean;
  risk: {
    chance: number;
    type: string;
    escape?: {
      run?: { chance: number; penalty: { inventory: number; cash: number } };
      fight?: { chance: number; penalty: { inventory: number; cash: number } };
      bribe?: { chance: number; penalty: { inventory: number; cash: number } };
    };
  };
}

const travelOptions: TravelOption[] = [
  {
    id: "marta",
    name: "MARTA",
    getPrice: () => 5,
    available: (from, to) => {
      return !([from, to].includes("cobbcounty"));
    },
    risk: {
      chance: 0.13,
      type: "MARTA police",
      escape: {
        run: { chance: 0.94, penalty: { inventory: 0.15, cash: 0.15 } },
        fight: { chance: 0.08, penalty: { inventory: 0.4, cash: 0.5 } }
      }
    }
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
    risk: {
      chance: 0.03,
      type: "undercover cop",
      escape: {
        bribe: { chance: 0.4, penalty: { inventory: 1, cash: 0.5 } }
      }
    }
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
    risk: {
      chance: 0.32,
      type: "GSP",
      escape: {
        run: { chance: 0.11, penalty: { inventory: 1, cash: 1 } }
      }
    }
  },
];

export const LocationCard = ({ location, currentLocation, onTravel, gameState, setGameState }: LocationCardProps) => {
  const [showTravelOptions, setShowTravelOptions] = useState(false);
  const [showRiskDialog, setShowRiskDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TravelOption | null>(null);
  const [rydeCooldown, setRydeCooldown] = useState(0);
  const isCurrentLocation = location.id === currentLocation;
  
  useEffect(() => {
    if (rydeCooldown > 0) {
      const timer = setTimeout(() => {
        setRydeCooldown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [rydeCooldown]);

  const handleTravel = (option: TravelOption) => {
    if (option.id === "ryde" && rydeCooldown > 0) {
      toast({
        title: "Ryde Cooldown",
        description: `Please wait ${rydeCooldown} seconds before using Ryde again.`
      });
      return;
    }

    const travelCost = option.getPrice(currentLocation, location.id);
    if (gameState.money < travelCost) {
      toast({
        title: "Not Enough Money",
        description: `You need $${travelCost} to travel using ${option.name}.`
      });
      return;
    }

    const roll = Math.random();
    if (roll < option.risk.chance) {
      setSelectedOption(option);
      setShowRiskDialog(true);
    } else {
      completeTravelWithoutIncident(option);
    }
  };

  const completeTravelWithoutIncident = (option: TravelOption) => {
    const travelCost = option.getPrice(currentLocation, location.id);
    
    if (option.id === "ryde") {
      setRydeCooldown(60);
    }
    
    setGameState(prev => ({
      ...prev,
      money: prev.money - travelCost
    }));
    
    onTravel(location.id, option.id);
    setShowTravelOptions(false);
  };

  const handleEscapeAttempt = (escapeMethod: string) => {
    if (!selectedOption) return;

    const escape = selectedOption.risk.escape?.[escapeMethod as keyof typeof selectedOption.risk.escape];
    if (!escape) return;

    if (escapeMethod === 'fight' && gameState.weapon.cooldown > 0) {
      toast({
        title: "Weapon Cooldown",
        description: `Your ${gameState.weapon.name} needs ${gameState.weapon.cooldown} minutes to cooldown.`
      });
      return;
    }

    const roll = Math.random();
    const winChance = escapeMethod === 'fight' ? gameState.weapon.winChance : escape.chance;

    if (roll < winChance) {
      toast({
        title: "Escaped!",
        description: `You got away but lost some items and cash.`
      });
      if (escapeMethod === 'fight') {
        setGameState(prev => ({
          ...prev,
          weapon: {
            ...prev.weapon,
            cooldown: 7
          }
        }));
      }
      onTravel(location.id, selectedOption.id);
    } else {
      if (selectedOption.id === "drive") {
        toast({
          title: "Game Over",
          description: "You were caught by GSP!"
        });
        // Handle game over
      } else {
        toast({
          title: "Caught!",
          description: `You were caught and lost items and cash.`
        });
        onTravel(location.id, selectedOption.id);
      }
    }
    setShowRiskDialog(false);
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
              const isRydeDisabled = option.id === "ryde" && rydeCooldown > 0;
              return (
                <Button
                  key={option.id}
                  onClick={() => handleTravel(option)}
                  className="w-full justify-between"
                  variant="outline"
                  disabled={isRydeDisabled}
                >
                  <span>{option.name}</span>
                  <div className="flex gap-2 items-center">
                    <span>${price}</span>
                    {isRydeDisabled && <span>({rydeCooldown}s)</span>}
                  </div>
                </Button>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showRiskDialog} onOpenChange={setShowRiskDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Police Encounter!</DialogTitle>
            <DialogDescription>
              You've been spotted by {selectedOption?.risk.type}!
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedOption?.risk.escape?.run && (
              <Button onClick={() => handleEscapeAttempt('run')} variant="outline">
                Run (94% escape chance)
              </Button>
            )}
            {selectedOption?.risk.escape?.fight && (
              <Button 
                onClick={() => handleEscapeAttempt('fight')} 
                variant="outline"
                disabled={gameState.weapon.cooldown > 0}
              >
                Fight with {gameState.weapon.name} ({(gameState.weapon.winChance * 100).toFixed(0)}% escape chance)
                {gameState.weapon.cooldown > 0 && ` (${gameState.weapon.cooldown}m cooldown)`}
              </Button>
            )}
            {selectedOption?.risk.escape?.bribe && (
              <Button onClick={() => handleEscapeAttempt('bribe')} variant="outline">
                Bribe (40% escape chance)
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
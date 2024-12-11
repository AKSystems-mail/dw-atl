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
import { LocationPrices } from "./LocationPrices";
import { TravelDialog } from "./TravelDialog";
import { TravelAnimation } from "./TravelAnimation";
import { travelOptions, locationRisks } from "../data/gameData";

interface LocationCardProps {
  location: Location;
  currentLocation: string;
  onTravel: (locationId: string, travelMethod: string) => void;
  gameState: GameState;
  setGameState: (state: GameState | ((prev: GameState) => GameState)) => void;
}

export const LocationCard = ({ location, currentLocation, onTravel, gameState, setGameState }: LocationCardProps) => {
  const [showTravelOptions, setShowTravelOptions] = useState(false);
  const [showRiskDialog, setShowRiskDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState<typeof travelOptions[0] | null>(null);
  const [rydeCooldown, setRydeCooldown] = useState(0);
  const [showTravelAnimation, setShowTravelAnimation] = useState(false);
  const [currentTravelMethod, setCurrentTravelMethod] = useState<string>("");
  
  const isCurrentLocation = location.id === currentLocation;
  
  useEffect(() => {
    if (rydeCooldown > 0) {
      const timer = setTimeout(() => {
        setRydeCooldown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [rydeCooldown]);

  const handleTravel = (option: typeof travelOptions[0]) => {
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

    // Check for location-specific risks first
    if (location.id === "westend") {
      const risk = locationRisks.westend;
      const roll = Math.random();
      if (roll < risk.chance) {
        setSelectedOption(option);
        setShowRiskDialog(true);
        return;
      }
    }

    // Check for travel-specific risks
    const riskChance = typeof option.risk.chance === 'function' 
      ? option.risk.chance(currentLocation, location.id, gameState)
      : option.risk.chance;

    const roll = Math.random();
    if (roll < riskChance) {
      setSelectedOption(option);
      setShowRiskDialog(true);
    } else {
      completeTravelWithoutIncident(option);
    }
  };

  const completeTravelWithoutIncident = (option: typeof travelOptions[0]) => {
    const travelCost = option.getPrice(currentLocation, location.id);
    
    if (option.id === "ryde") {
      setRydeCooldown(60);
    }
    
    setGameState(prev => ({
      ...prev,
      money: prev.money - travelCost
    }));

    setCurrentTravelMethod(option.id);
    setShowTravelAnimation(true);
    setShowTravelOptions(false);
  };

  const handleAnimationComplete = () => {
    setShowTravelAnimation(false);
    onTravel(location.id, currentTravelMethod);
  };

  const handleEscapeAttempt = (escapeMethod: string) => {
    if (!selectedOption) return;

    // Handle location-specific risks
    if (location.id === "westend" && locationRisks.westend) {
      const risk = locationRisks.westend;
      if (escapeMethod === 'fight' && gameState.weapon.id === 'fists') {
        toast({
          title: "No Weapon",
          description: "You need a weapon to fight the YNs!"
        });
        return;
      }

      const roll = Math.random();
      const escape = risk.escape[escapeMethod as keyof typeof risk.escape];
      if (!escape) return;

      if (roll < escape.chance) {
        handleSuccessfulEscape(escape.penalty);
      } else if (escapeMethod === 'fight') {
        toast({
          title: "Game Over",
          description: "You lost the fight with the YNs!"
        });
        // Handle game over
      } else {
        handleFailedEscape(escape.penalty);
      }
      return;
    }

    // Handle regular travel risks
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
      handleSuccessfulEscape(escape.penalty);
    } else {
      handleFailedEscape(escape.penalty);
    }
    setShowRiskDialog(false);
  };

  const handleSuccessfulEscape = (penalty: { inventory: number; cash: number }) => {
    toast({
      title: "Escaped!",
      description: "You got away but lost some items and cash."
    });
    applyPenalties(penalty);
    setCurrentTravelMethod(selectedOption!.id);
    setShowTravelAnimation(true);
  };

  const handleFailedEscape = (penalty: { inventory: number; cash: number }) => {
    toast({
      title: "Caught!",
      description: "You were caught and lost items and cash."
    });
    applyPenalties(penalty);
    setCurrentTravelMethod(selectedOption!.id);
    setShowTravelAnimation(true);
  };

  const applyPenalties = (penalty: { inventory: number; cash: number }) => {
    setGameState(prev => ({
      ...prev,
      money: Math.floor(prev.money * (1 - penalty.cash)),
      inventory: Object.fromEntries(
        Object.entries(prev.inventory).map(([id, amount]) => [
          id,
          Math.floor(amount * (1 - penalty.inventory))
        ])
      )
    }));
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
      
      <LocationPrices location={location} isCurrentLocation={isCurrentLocation} />

      <TravelDialog
        open={showTravelOptions}
        onOpenChange={setShowTravelOptions}
        travelOptions={travelOptions}
        onTravel={handleTravel}
        currentLocation={currentLocation}
        destinationId={location.id}
        rydeCooldown={rydeCooldown}
      />

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

      {showTravelAnimation && (
        <TravelAnimation
          travelMethod={currentTravelMethod}
          onComplete={handleAnimationComplete}
        />
      )}
    </div>
  );
};

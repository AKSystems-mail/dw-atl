import { useState } from "react";
import { GameState, TravelOption } from "../../types/game";
import { toast } from "@/components/ui/use-toast";
import { locationRisks } from "../../data/gameData";
import { applyPenalties } from "../../utils/riskCalculations";

interface TravelManagerProps {
  currentLocation: string;
  destinationId: string;
  onTravel: (locationId: string, travelMethod: string) => void;
  gameState: GameState;
  setGameState: (state: GameState | ((prev: GameState) => GameState)) => void;
}

export const TravelManager = ({
  currentLocation,
  destinationId,
  onTravel,
  gameState,
  setGameState
}: TravelManagerProps) => {
  const [showTravelOptions, setShowTravelOptions] = useState(false);
  const [showRiskDialog, setShowRiskDialog] = useState(false);
  const [selectedOption, setSelectedOption] = useState<TravelOption | null>(null);
  const [rydeCooldown, setRydeCooldown] = useState(0);
  const [showTravelAnimation, setShowTravelAnimation] = useState(false);
  const [currentTravelMethod, setCurrentTravelMethod] = useState<string>("");
  const [hasEncounteredRisk, setHasEncounteredRisk] = useState(false);

  const handleTravel = (option: TravelOption) => {
    if (option.id === "ryde" && rydeCooldown > 0) {
      toast({
        title: "Ryde Cooldown",
        description: `Please wait ${rydeCooldown} seconds before using Ryde again.`
      });
      return;
    }

    const travelCost = option.getPrice(currentLocation, destinationId);
    if (gameState.money < travelCost) {
      toast({
        title: "Not Enough Money",
        description: `You need $${travelCost} to travel using ${option.name}.`
      });
      return;
    }

    if (!hasEncounteredRisk) {
      if (destinationId === "westend") {
        const risk = locationRisks.westend;
        const roll = Math.random();
        if (roll < risk.chance) {
          setSelectedOption(option);
          setShowRiskDialog(true);
          setHasEncounteredRisk(true);
          return;
        }
      }

      const riskChance = typeof option.risk.chance === 'function' 
        ? option.risk.chance(currentLocation, destinationId, gameState)
        : option.risk.chance;

      const roll = Math.random();
      if (roll < riskChance) {
        setSelectedOption(option);
        setShowRiskDialog(true);
        setHasEncounteredRisk(true);
        return;
      }
    }

    completeTravelWithoutIncident(option);
  };

  const completeTravelWithoutIncident = (option: TravelOption) => {
    const travelCost = option.getPrice(currentLocation, destinationId);
    
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
    onTravel(destinationId, currentTravelMethod);
    toast({
      title: "Arrived!",
      description: `You arrived in ${getLocationName(destinationId)}!`
    });
    setHasEncounteredRisk(false);
  };

  const getLocationName = (id: string) => {
    switch(id) {
      case "midtown": return "Midtown";
      case "buckhead": return "Buckhead";
      case "cobbcounty": return "Cobb County";
      case "littlefive": return "Little Five Points";
      case "decatur": return "Decatur";
      case "westend": return "West End";
      default: return id;
    }
  };

  const handleEscapeAttempt = (escapeMethod: string) => {
    if (!selectedOption) return;

    if (destinationId === "westend" && locationRisks.westend) {
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
      } else {
        handleFailedEscape(escape.penalty);
      }
      return;
    }

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

  const handleSuccessfulEscape = (penalty: any) => {
    toast({
      title: "Escaped!",
      description: "You got away but lost some items and cash."
    });
    const updates = applyPenalties(gameState, penalty, destinationId);
    setGameState(prev => ({
      ...prev,
      ...updates
    }));
    setCurrentTravelMethod(selectedOption!.id);
    setShowTravelAnimation(true);
  };

  const handleFailedEscape = (penalty: any) => {
    toast({
      title: "Caught!",
      description: "You were caught and lost items and cash."
    });
    const updates = applyPenalties(gameState, penalty, destinationId);
    setGameState(prev => ({
      ...prev,
      ...updates
    }));
    setCurrentTravelMethod(selectedOption!.id);
    setShowTravelAnimation(true);
  };

  return {
    showTravelOptions,
    setShowTravelOptions,
    showRiskDialog,
    setShowRiskDialog,
    selectedOption,
    handleTravel,
    handleEscapeAttempt,
    showTravelAnimation,
    currentTravelMethod,
    handleAnimationComplete,
    rydeCooldown
  };
};

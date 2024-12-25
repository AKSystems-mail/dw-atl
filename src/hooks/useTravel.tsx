import { GameState } from "../types/game";
import { DAILY_INTEREST_RATE } from "../data/gameData";
import { toast } from "@/components/ui/use-toast";

export const useTravel = (
  setGameState: (state: GameState | ((prev: GameState) => GameState)) => void,
  setPriceState: (state: any) => void,
  generatePrices: () => any
) => {
  const handleTravel = (locationId: string) => {
    setGameState(prev => ({
      ...prev,
      currentLocation: locationId,
      day: prev.day + 1,
      debt: prev.debt > 0 ? Math.floor(prev.debt * (1 + DAILY_INTEREST_RATE)) : 0
    }));
    setPriceState(prev => ({
      ...prev,
      locations: generatePrices(),
    }));
    toast({
      title: "Traveled!",
      description: `You've arrived at ${locationId}`,
    });
  };

  return { handleTravel };
};
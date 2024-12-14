import { TravelDialog } from "../TravelDialog";
import { RiskDialog } from "../RiskDialog";
import { TravelAnimation } from "../TravelAnimation";
import { TravelOption, GameState } from "../../types/game";

interface LocationDialogsProps {
  showTravelOptions: boolean;
  setShowTravelOptions: (show: boolean) => void;
  showRiskDialog: boolean;
  setShowRiskDialog: (show: boolean) => void;
  selectedOption: TravelOption | null;
  handleTravel: (option: TravelOption) => void;
  handleEscapeAttempt: (method: string) => void;
  showTravelAnimation: boolean;
  currentTravelMethod: string;
  handleAnimationComplete: () => void;
  rydeCooldown: number;
  currentLocation: string;
  destinationId: string;
  travelOptions: TravelOption[];
  gameState: GameState;
}

export const LocationDialogs = ({
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
  rydeCooldown,
  currentLocation,
  destinationId,
  travelOptions,
  gameState,
}: LocationDialogsProps) => {
  return (
    <>
      <TravelDialog
        open={showTravelOptions}
        onOpenChange={setShowTravelOptions}
        travelOptions={travelOptions}
        onTravel={handleTravel}
        currentLocation={currentLocation}
        destinationId={destinationId}
        rydeCooldown={rydeCooldown}
      />

      <RiskDialog
        open={showRiskDialog}
        onOpenChange={setShowRiskDialog}
        selectedOption={selectedOption}
        onEscapeAttempt={handleEscapeAttempt}
        gameState={gameState}
      />

      {showTravelAnimation && (
        <TravelAnimation
          travelMethod={currentTravelMethod}
          onComplete={handleAnimationComplete}
        />
      )}
    </>
  );
};
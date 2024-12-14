import { useState, useEffect } from "react";
import { Location, GameState } from "../types/game";
import { LocationPrices } from "./LocationPrices";
import { TravelDialog } from "./TravelDialog";
import { TravelAnimation } from "./TravelAnimation";
import { RiskDialog } from "./RiskDialog";
import { TravelManager } from "./travel/TravelManager";
import { travelOptions } from "../data/travelData";
import { DebtRepayment } from "./DebtRepayment";

interface LocationCardProps {
  location: Location;
  currentLocation: string;
  onTravel: (locationId: string, travelMethod: string) => void;
  gameState: GameState;
  setGameState: (state: GameState | ((prev: GameState) => GameState)) => void;
}

export const LocationCard = ({ 
  location, 
  currentLocation, 
  onTravel, 
  gameState, 
  setGameState 
}: LocationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isCurrentLocation = location.id === currentLocation;
  const showDebtRepayment = isCurrentLocation && location.id === "buckhead" && gameState.debt > 0;

  const {
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
  } = TravelManager({
    currentLocation,
    destinationId: location.id,
    onTravel,
    gameState,
    setGameState
  });

  const handleLocationClick = () => {
    if (!isCurrentLocation) {
      setShowTravelOptions(true);
    }
  };

  return (
    <div 
      className={`bg-game-card p-4 rounded-lg mb-4 transition-all duration-300 cursor-pointer
        ${isCurrentLocation ? 'border-2 border-game-accent animate-glow' : 'hover:scale-[1.02]'}
        ${isHovered && !isCurrentLocation ? 'shadow-lg shadow-game-accent/20' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleLocationClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-white">{location.name}</h3>
      </div>
      <p className="text-sm text-gray-400">{location.description}</p>
      
      <LocationPrices location={location} isCurrentLocation={isCurrentLocation} />

      {showDebtRepayment && (
        <DebtRepayment gameState={gameState} setGameState={setGameState} />
      )}

      <TravelDialog
        open={showTravelOptions}
        onOpenChange={setShowTravelOptions}
        travelOptions={travelOptions}
        onTravel={handleTravel}
        currentLocation={currentLocation}
        destinationId={location.id}
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
    </div>
  );
};
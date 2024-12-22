import { useState } from "react";
import { Location, GameState } from "../../types/game";
import { LocationPrices } from "../LocationPrices";
import { DebtRepayment } from "../DebtRepayment";
import { TravelManager } from "../travel/TravelManager";
import { travelOptions } from "../../data/travelData";
import { LocationHeader } from "./LocationHeader";
import { LocationDialogs } from "./LocationDialogs";
import { motion, AnimatePresence } from "framer-motion";

interface LocationCardProps {
  location: Location;
  currentLocation: string;
  onTravel: (locationId: string, travelMethod: string) => void;
  gameState: GameState;
  setGameState: (state: GameState | ((prev: GameState) => GameState)) => void;
  onBuy: (itemId: string) => void;
  onSell: (itemId: string) => void;
}

export const LocationCard = ({ 
  location, 
  currentLocation, 
  onTravel, 
  gameState, 
  setGameState,
  onBuy,
  onSell
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
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`
        group bg-game-card p-4 rounded-lg mb-4 transition-all duration-300 cursor-pointer
        relative overflow-hidden
        ${isCurrentLocation ? 'border-2 border-game-accent animate-glow' : 'hover:scale-[1.02]'}
        ${isHovered && !isCurrentLocation ? 'shadow-lg shadow-game-accent/20' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleLocationClick}
    >
      <LocationHeader location={location} isCurrentLocation={isCurrentLocation} />
      
      <AnimatePresence>
        {isCurrentLocation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LocationPrices 
              location={location} 
              isCurrentLocation={isCurrentLocation}
              gameState={gameState}
              onBuy={onBuy}
              onSell={onSell}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showDebtRepayment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <DebtRepayment gameState={gameState} setGameState={setGameState} />
        </motion.div>
      )}

      <LocationDialogs
        showTravelOptions={showTravelOptions}
        setShowTravelOptions={setShowTravelOptions}
        showRiskDialog={showRiskDialog}
        setShowRiskDialog={setShowRiskDialog}
        selectedOption={selectedOption}
        handleTravel={handleTravel}
        handleEscapeAttempt={handleEscapeAttempt}
        showTravelAnimation={showTravelAnimation}
        currentTravelMethod={currentTravelMethod}
        handleAnimationComplete={handleAnimationComplete}
        rydeCooldown={rydeCooldown}
        currentLocation={currentLocation}
        destinationId={location.id}
        travelOptions={travelOptions}
        gameState={gameState}
      />
    </motion.div>
  );
};
import { Location } from "../../types/game";
import { motion } from "framer-motion";

interface LocationHeaderProps {
  location: Location;
  isCurrentLocation: boolean;
}

export const LocationHeader = ({ location, isCurrentLocation }: LocationHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-2">
      <div className="space-y-1">
        <motion.h3 
          className="text-lg font-bold text-white group-hover:text-game-accent transition-colors"
          layout
        >
          {location.name}
        </motion.h3>
        <motion.p 
          className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors"
          layout
        >
          {location.description}
        </motion.p>
      </div>
      {isCurrentLocation && (
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <span className="inline-block w-2 h-2 bg-game-accent rounded-full animate-pulse" />
          <span className="text-xs text-game-accent">Current</span>
        </motion.div>
      )}
    </div>
  );
};
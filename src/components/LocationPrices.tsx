import { Location } from "../types/game";
import { motion } from "framer-motion";

interface LocationPricesProps {
  location: Location;
  isCurrentLocation: boolean;
}

export const LocationPrices = ({ location, isCurrentLocation }: LocationPricesProps) => {
  if (!isCurrentLocation) {
    return null;
  }

  return (
    <div className="mt-4">
      <h4 className="text-sm font-semibold text-game-accent mb-2">Current Market Prices</h4>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(location.prices).map(([itemId, price], index) => (
          <motion.div
            key={itemId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-game-background/50 p-2 rounded-md flex justify-between items-center"
          >
            <span className="text-sm text-game-accent2 capitalize">{itemId}</span>
            <span className="text-sm font-medium text-white">${price}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
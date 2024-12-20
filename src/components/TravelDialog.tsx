import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { TravelOption } from "../types/game";
import { motion } from "framer-motion";

interface TravelDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  travelOptions: TravelOption[];
  onTravel: (option: TravelOption) => void;
  currentLocation: string;
  destinationId: string;
  rydeCooldown: number;
}

export const TravelDialog = ({
  open,
  onOpenChange,
  travelOptions,
  onTravel,
  currentLocation,
  destinationId,
  rydeCooldown,
}: TravelDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-game-card border-game-accent border-2">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-bold">Choose Travel Option</DialogTitle>
        </DialogHeader>
        <motion.div 
          className="grid gap-4 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {travelOptions.map((option, index) => {
            if (!option.available(currentLocation, destinationId)) return null;
            const price = option.getPrice(currentLocation, destinationId);
            const isRydeDisabled = option.id === "ryde" && rydeCooldown > 0;
            
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  onClick={() => onTravel(option)}
                  className={`
                    w-full justify-between bg-game-background 
                    hover:bg-game-accent hover:text-game-background text-white 
                    border border-game-accent/20 transition-all duration-300
                    ${isRydeDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}
                  `}
                  variant="outline"
                  disabled={isRydeDisabled}
                >
                  <span className="flex items-center gap-2">
                    {option.name}
                    {isRydeDisabled && (
                      <span className="text-xs text-game-accent2">
                        Cooldown: {rydeCooldown}s
                      </span>
                    )}
                  </span>
                  <span className="text-game-accent font-bold">${price}</span>
                </Button>
              </motion.div>
            );
          })}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};
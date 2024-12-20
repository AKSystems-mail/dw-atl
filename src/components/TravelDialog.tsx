import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { TravelOption } from "../types/game";

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
        <div className="grid gap-4 py-4">
          {travelOptions.map((option) => {
            if (!option.available(currentLocation, destinationId)) return null;
            const price = option.getPrice(currentLocation, destinationId);
            const isRydeDisabled = option.id === "ryde" && rydeCooldown > 0;
            return (
              <Button
                key={option.id}
                onClick={() => onTravel(option)}
                className="w-full justify-between bg-game-background hover:bg-game-accent hover:text-game-background text-white border border-game-accent/20 transition-all duration-300"
                variant="outline"
                disabled={isRydeDisabled}
              >
                <span>{option.name}</span>
                <div className="flex gap-2 items-center">
                  <span className="text-game-accent">${price}</span>
                  {isRydeDisabled && <span className="text-game-accent2">({rydeCooldown}s)</span>}
                </div>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Choose Travel Option</DialogTitle>
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
                className="w-full justify-between"
                variant="outline"
                disabled={isRydeDisabled}
              >
                <span>{option.name}</span>
                <div className="flex gap-2 items-center">
                  <span>${price}</span>
                  {isRydeDisabled && <span>({rydeCooldown}s)</span>}
                </div>
              </Button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};
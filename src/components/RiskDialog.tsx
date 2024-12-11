import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GameState, TravelOption } from "../types/game";

interface RiskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedOption: TravelOption | null;
  onEscapeAttempt: (method: string) => void;
  gameState: GameState;
}

export const RiskDialog = ({
  open,
  onOpenChange,
  selectedOption,
  onEscapeAttempt,
  gameState
}: RiskDialogProps) => {
  const riskType = typeof selectedOption?.risk.type === 'function' 
    ? selectedOption?.risk.type(gameState.currentLocation)
    : selectedOption?.risk.type;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Police Encounter!</DialogTitle>
          <DialogDescription>
            You've been spotted by {riskType}!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {selectedOption?.risk.escape?.run && (
            <Button onClick={() => onEscapeAttempt('run')} variant="outline">
              Run (94% escape chance)
            </Button>
          )}
          {selectedOption?.risk.escape?.fight && (
            <Button 
              onClick={() => onEscapeAttempt('fight')} 
              variant="outline"
              disabled={gameState.weapon.cooldown > 0}
            >
              Fight with {gameState.weapon.name} ({(gameState.weapon.winChance * 100).toFixed(0)}% escape chance)
              {gameState.weapon.cooldown > 0 && ` (${gameState.weapon.cooldown}m cooldown)`}
            </Button>
          )}
          {selectedOption?.risk.escape?.bribe && (
            <Button onClick={() => onEscapeAttempt('bribe')} variant="outline">
              Bribe (40% escape chance)
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GameState, TravelOption } from "../types/game";
import { toast } from "@/components/ui/use-toast";

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

  const handleFight = () => {
    if (gameState.weapon.id !== "fists" && gameState.weapon.usesLeft !== undefined) {
      // If this is the last use, revert to fists after the fight
      if (gameState.weapon.usesLeft <= 1) {
        toast({
          title: "Weapon Broken!",
          description: `Your ${gameState.weapon.name} has broken after this fight!`,
        });
      }
    }
    onEscapeAttempt('fight');
  };

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
              onClick={handleFight} 
              variant="outline"
              disabled={gameState.weapon.cooldown > 0}
            >
              Fight with {gameState.weapon.name} ({(gameState.weapon.winChance * 100).toFixed(0)}% escape chance)
              {gameState.weapon.cooldown > 0 && ` (${gameState.weapon.cooldown}m cooldown)`}
              {gameState.weapon.id !== "fists" && gameState.weapon.usesLeft !== undefined && 
                ` (${gameState.weapon.usesLeft} uses left)`}
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
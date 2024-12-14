import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GameSettings } from "./GameSettings";
import { GameSettings as GameSettingsType } from "../../types/game";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface SettingsDialogProps {
  settings: GameSettingsType;
  onSettingsChange: (settings: Partial<GameSettingsType>) => void;
}

export const SettingsDialog = ({ settings, onSettingsChange }: SettingsDialogProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingSettings, setPendingSettings] = useState<Partial<GameSettingsType> | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSettingsChange = (newSettings: Partial<GameSettingsType>) => {
    // Only show confirmation for duration and difficulty changes
    if (newSettings.duration !== undefined || newSettings.difficulty !== undefined) {
      setPendingSettings(newSettings);
      setShowConfirm(true);
    } else {
      // Directly apply non-game-resetting changes like volume and sound
      onSettingsChange(newSettings);
    }
  };

  const confirmChange = () => {
    if (pendingSettings) {
      onSettingsChange(pendingSettings);
      setPendingSettings(null);
    }
    setShowConfirm(false);
    // Keep the settings dialog open after confirmation
    setIsOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    // Reset pending settings when dialog is closed
    if (!open) {
      setPendingSettings(null);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Game Settings</DialogTitle>
            <DialogDescription>
              Adjust your game settings. Changing duration or difficulty will start a new game.
            </DialogDescription>
          </DialogHeader>
          <GameSettings settings={settings} onSettingsChange={handleSettingsChange} />
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start New Game?</AlertDialogTitle>
            <AlertDialogDescription>
              Changing game duration or difficulty will start a new game. Your current progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowConfirm(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmChange}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

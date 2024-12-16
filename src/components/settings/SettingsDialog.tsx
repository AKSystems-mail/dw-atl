import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { GameSettings } from "./GameSettings";
import { GameSettings as GameSettingsType } from "../../types/game";
import { useState } from "react";

interface SettingsDialogProps {
  settings: GameSettingsType;
  onSettingsChange: (settings: Partial<GameSettingsType>) => void;
}

export const SettingsDialog = ({ settings, onSettingsChange }: SettingsDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSettings, setTempSettings] = useState<GameSettingsType>(settings);

  const handleSettingsChange = (newSettings: Partial<GameSettingsType>) => {
    setTempSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleSave = () => {
    onSettingsChange(tempSettings);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempSettings(settings);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
          <DialogDescription>
            Adjust your game settings. Changing duration will start a new game.
          </DialogDescription>
        </DialogHeader>
        <GameSettings settings={tempSettings} onSettingsChange={handleSettingsChange} />
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>Ok</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
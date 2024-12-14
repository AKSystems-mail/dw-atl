import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GameSettings as GameSettingsType } from "../../types/game";

interface GameSettingsProps {
  settings: GameSettingsType;
  onSettingsChange: (settings: Partial<GameSettingsType>) => void;
}

export const GameSettings = ({ settings, onSettingsChange }: GameSettingsProps) => {
  return (
    <div className="space-y-6 p-4 bg-game-card rounded-lg">
      <h3 className="text-lg font-bold text-white mb-4">Game Settings</h3>
      
      <div className="flex items-center justify-between">
        <Label htmlFor="sound" className="text-white">Sound</Label>
        <Switch
          id="sound"
          checked={settings.sound}
          onCheckedChange={(checked) => onSettingsChange({ sound: checked })}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="volume" className="text-white">Volume</Label>
        <Slider
          id="volume"
          min={0}
          max={100}
          step={1}
          value={[settings.volume || 50]}
          onValueChange={(value) => onSettingsChange({ volume: value[0] })}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration" className="text-white">Game Duration</Label>
        <Select
          value={settings.duration.toString()}
          onValueChange={(value) => onSettingsChange({ duration: parseInt(value) })}
        >
          <SelectTrigger id="duration" className="w-full">
            <SelectValue placeholder="Select duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">30 Days</SelectItem>
            <SelectItem value="60">60 Days</SelectItem>
            <SelectItem value="90">90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="difficulty" className="text-white">Difficulty</Label>
        <Select
          value={settings.difficulty}
          onValueChange={(value: "mount_paran" | "east_atlanta" | "hapeville") => 
            onSettingsChange({ difficulty: value })}
        >
          <SelectTrigger id="difficulty" className="w-full">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mount_paran">Mt. Paran (Easy)</SelectItem>
            <SelectItem value="east_atlanta">East Atlanta (Normal)</SelectItem>
            <SelectItem value="hapeville">Hapeville (Hard)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
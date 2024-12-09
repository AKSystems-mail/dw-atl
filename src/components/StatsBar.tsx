import { GameState } from "../types/game";

interface StatsBarProps {
  gameState: GameState;
}

export const StatsBar = ({ gameState }: StatsBarProps) => {
  return (
    <div className="flex justify-between items-center bg-game-card p-4 rounded-lg mb-4 text-white">
      <div className="flex gap-4">
        <div>
          <div className="text-sm text-game-accent">Cash</div>
          <div className="font-bold">${gameState.money}</div>
        </div>
        <div>
          <div className="text-sm text-game-accent2">Debt</div>
          <div className="font-bold">${gameState.debt}</div>
        </div>
      </div>
      <div>
        <div className="text-sm text-game-accent">Day</div>
        <div className="font-bold">{gameState.day} / 30</div>
      </div>
    </div>
  );
};
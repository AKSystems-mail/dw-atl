import { GameState } from "../types/game";

interface StatsBarProps {
  gameState: GameState;
}

export const StatsBar = ({ gameState }: StatsBarProps) => {
  // Ensure money is always a valid number
  const displayMoney = isNaN(gameState.money) ? 0 : Math.floor(gameState.money);
  const displayDebt = isNaN(gameState.debt) ? 0 : Math.floor(gameState.debt);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-game-card p-4 rounded-lg mb-4 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex gap-4">
          <div>
            <div className="text-sm text-game-accent">Cash</div>
            <div className="font-bold">${displayMoney}</div>
          </div>
          <div>
            <div className="text-sm text-game-accent2">Debt</div>
            <div className="font-bold">${displayDebt}</div>
          </div>
        </div>
        <div>
          <div className="text-sm text-game-accent">Day</div>
          <div className="font-bold">{gameState.day} / 30</div>
        </div>
      </div>
    </div>
  );
};
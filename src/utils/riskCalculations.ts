import { GameState, RiskPenalty } from "../types/game";

export const calculatePenalty = (
  penalty: number | ((to: string) => number),
  destinationId: string
): number => {
  if (typeof penalty === 'function') {
    return penalty(destinationId);
  }
  return penalty;
};

export const applyPenalties = (
  gameState: GameState,
  penalty: RiskPenalty,
  destinationId: string
): Partial<GameState> => {
  const inventoryPenalty = calculatePenalty(penalty.inventory, destinationId);
  const cashPenalty = calculatePenalty(penalty.cash, destinationId);

  return {
    money: Math.floor(gameState.money * (1 - cashPenalty)),
    inventory: Object.fromEntries(
      Object.entries(gameState.inventory).map(([id, amount]) => [
        id,
        Math.floor(amount * (1 - inventoryPenalty))
      ])
    )
  };
};
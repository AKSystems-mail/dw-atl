import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { BookBag, GameState } from "../../types/game";

interface BookBagUpgradeProps {
  gameState: GameState;
  nextBag: BookBag | undefined;
  canBuyBookBag: boolean;
}

export const BookBagUpgrade = ({ gameState, nextBag, canBuyBookBag }: BookBagUpgradeProps) => {
  if (!canBuyBookBag || !nextBag) return null;

  return (
    <div className="mb-4 p-2 border border-game-accent rounded-lg">
      <div className="text-white text-sm mb-2">
        Upgrade available: {nextBag.name}
      </div>
      <div className="flex justify-between items-center">
        <div className="text-game-accent text-sm">
          Capacity: {nextBag.capacity} | Price: ${nextBag.price}
        </div>
        <Button
          onClick={() => {
            if (gameState.money >= nextBag.price) {
              toast({
                title: "Bookbag Upgraded",
                description: `You now have a ${nextBag.name} with ${nextBag.capacity} capacity!`,
              });
            } else {
              toast({
                title: "Not Enough Money",
                description: "You can't afford this upgrade yet.",
              });
            }
          }}
          disabled={gameState.money < nextBag.price}
          className="bg-game-accent hover:bg-game-accent/80 text-black"
        >
          Upgrade
        </Button>
      </div>
    </div>
  );
};
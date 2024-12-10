import { GameState, Weapon } from "../types/game";
import { Button } from "@/components/ui/button";
import { weapons } from "../data/gameData";
import { toast } from "@/components/ui/use-toast";

interface WeaponsShopProps {
  gameState: GameState;
  onBuyWeapon: (weapon: Weapon) => void;
}

export const WeaponsShop = ({ gameState, onBuyWeapon }: WeaponsShopProps) => {
  if (gameState.currentLocation !== "westend") {
    return null;
  }

  return (
    <div className="bg-game-card p-4 rounded-lg mt-4">
      <h3 className="text-lg font-bold text-white mb-4">Weapons Shop</h3>
      <div className="space-y-4">
        {weapons.filter(w => w.id !== "fists").map((weapon) => (
          <div key={weapon.id} className="flex justify-between items-center">
            <div>
              <div className="text-white">{weapon.name}</div>
              <div className="text-sm text-game-accent">
                Win Rate: {(weapon.winChance * 100).toFixed(0)}% | Price: ${weapon.price}
              </div>
            </div>
            <Button
              onClick={() => {
                if (gameState.money >= weapon.price) {
                  onBuyWeapon(weapon);
                  toast({
                    title: "Weapon Purchased",
                    description: `You now have a ${weapon.name}!`,
                  });
                } else {
                  toast({
                    title: "Not Enough Money",
                    description: "You can't afford this weapon.",
                  });
                }
              }}
              disabled={gameState.money < weapon.price}
              className="bg-game-accent hover:bg-game-accent/80 text-black"
            >
              Buy
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
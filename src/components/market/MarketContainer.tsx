import { GameState, Item } from "../../types/game";
import { Inventory } from "../Inventory";
import { WeaponsShop } from "../WeaponsShop";
import { useEffect, useRef } from "react";

interface MarketContainerProps {
  gameState: GameState;
  currentLocationPrices: Record<string, number>;
  items: Item[];
  onBuy: (itemId: string) => void;
  onSell: (itemId: string) => void;
  onBuyWeapon: (weapon: any) => void;
}

export const MarketContainer = ({
  gameState,
  currentLocationPrices,
  items,
  onBuy,
  onSell,
  onBuyWeapon,
}: MarketContainerProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const updateScrollIndicator = () => {
      const scrollPercentage = container.scrollTop / (container.scrollHeight - container.clientHeight);
      container.style.setProperty('--scroll-percentage', String(scrollPercentage));
    };

    container.addEventListener('scroll', updateScrollIndicator);
    return () => container.removeEventListener('scroll', updateScrollIndicator);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-game-card border-t border-game-accent/20 p-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-4">Market</h2>
        <div 
          ref={scrollContainerRef}
          className="max-h-[40vh] overflow-y-auto"
          style={{
            msOverflowStyle: "none",
            scrollbarWidth: "none"
          }}
        >
          <div className="relative">
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-game-accent/20">
              <div 
                className="h-full bg-game-accent"
                style={{
                  width: '100%',
                  transform: 'scaleX(var(--scroll-percentage, 0))',
                  transformOrigin: 'left',
                  transition: 'transform 0.1s ease-out'
                }}
              />
            </div>
            <Inventory
              gameState={gameState}
              items={items}
              locationPrices={currentLocationPrices}
              onBuy={onBuy}
              onSell={onSell}
            />
            <WeaponsShop
              gameState={gameState}
              onBuyWeapon={onBuyWeapon}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
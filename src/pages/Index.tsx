import { useState, useEffect } from "react";
import { StatsBar } from "../components/StatsBar";
import { LocationCard } from "../components/LocationCard";
import { Inventory } from "../components/Inventory";
import { GameState, Location, PriceState } from "../types/game";
import { INITIAL_MONEY, INITIAL_DEBT, items, generatePrices } from "../data/gameData";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    money: INITIAL_MONEY,
    debt: INITIAL_DEBT,
    day: 1,
    currentLocation: "midtown",
    inventory: {},
    health: 100,
  });

  const [priceState, setPriceState] = useState<PriceState>({
    locations: generatePrices(),
    items: items,
  });

  const handleTravel = (locationId: string) => {
    setGameState(prev => ({
      ...prev,
      currentLocation: locationId,
      day: prev.day + 1,
    }));
    setPriceState(prev => ({
      ...prev,
      locations: generatePrices(),
    }));
    toast({
      title: "Traveled!",
      description: `You've arrived at ${locationId}`,
    });
  };

  const handleBuy = (itemId: string) => {
    const currentLocation = priceState.locations.find(
      loc => loc.id === gameState.currentLocation
    );
    if (!currentLocation) return;

    const price = currentLocation.prices[itemId];
    if (gameState.money < price) return;

    setGameState(prev => ({
      ...prev,
      money: prev.money - price,
      inventory: {
        ...prev.inventory,
        [itemId]: (prev.inventory[itemId] || 0) + 1,
      },
    }));
  };

  const handleSell = (itemId: string) => {
    const currentLocation = priceState.locations.find(
      loc => loc.id === gameState.currentLocation
    );
    if (!currentLocation) return;

    const price = currentLocation.prices[itemId];
    if (!gameState.inventory[itemId]) return;

    setGameState(prev => ({
      ...prev,
      money: prev.money + price,
      inventory: {
        ...prev.inventory,
        [itemId]: prev.inventory[itemId] - 1,
      },
    }));
  };

  const currentLocation = priceState.locations.find(
    loc => loc.id === gameState.currentLocation
  );

  return (
    <div className="min-h-screen bg-game-background p-4">
      <StatsBar gameState={gameState} />
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Locations</h2>
          {priceState.locations.map(location => (
            <LocationCard
              key={location.id}
              location={location}
              currentLocation={gameState.currentLocation}
              onTravel={handleTravel}
            />
          ))}
        </div>
        
        <div>
          <h2 className="text-xl font-bold text-white mb-4">Market</h2>
          {currentLocation && (
            <Inventory
              gameState={gameState}
              items={items}
              locationPrices={currentLocation.prices}
              onBuy={handleBuy}
              onSell={handleSell}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
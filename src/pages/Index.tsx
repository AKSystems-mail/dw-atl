import { useState } from "react";
import { StatsBar } from "../components/StatsBar";
import { GameState, Location, PriceState, Weapon } from "../types/game";
import { INITIAL_MONEY, INITIAL_DEBT, items, generatePrices, DAILY_INTEREST_RATE } from "../data/gameData";
import { toast } from "@/components/ui/use-toast";
import { LocationsContainer } from "../components/locations/LocationsContainer";
import { MarketContainer } from "../components/market/MarketContainer";

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    money: INITIAL_MONEY,
    debt: INITIAL_DEBT,
    day: 1,
    currentLocation: "midtown",
    inventory: {},
    health: 100,
    bookBag: {
      capacity: 100,
      currentSize: 0,
    },
    weapon: {
      id: "fists",
      name: "Fists",
      winChance: 0.45,
      cooldown: 0
    },
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
      debt: prev.debt > 0 ? Math.floor(prev.debt * (1 + DAILY_INTEREST_RATE)) : 0
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
    if (gameState.money < price) {
      toast({
        title: "Not Enough Money",
        description: `You need $${price} to buy this item.`,
      });
      return;
    }

    setGameState(prev => ({
      ...prev,
      money: Math.max(0, prev.money - price),
      inventory: {
        ...prev.inventory,
        [itemId]: (prev.inventory[itemId] || 0) + 1,
      },
      bookBag: {
        ...prev.bookBag,
        currentSize: prev.bookBag.currentSize + 1,
      },
    }));
  };

  const handleSell = (itemId: string) => {
    const currentLocation = priceState.locations.find(
      loc => loc.id === gameState.currentLocation
    );
    if (!currentLocation) return;

    const price = currentLocation.prices[itemId];
    if (!gameState.inventory[itemId] || gameState.inventory[itemId] <= 0) {
      toast({
        title: "No Items to Sell",
        description: "You don't have any of this item to sell.",
      });
      return;
    }

    setGameState(prev => ({
      ...prev,
      money: prev.money + price,
      inventory: {
        ...prev.inventory,
        [itemId]: prev.inventory[itemId] - 1,
      },
      bookBag: {
        ...prev.bookBag,
        currentSize: prev.bookBag.currentSize - 1,
      },
    }));

    toast({
      title: "Item Sold",
      description: `Sold for $${price}`,
    });
  };

  const handleBuyWeapon = (weapon: Weapon) => {
    if (gameState.money >= weapon.price) {
      setGameState(prev => ({
        ...prev,
        money: prev.money - weapon.price,
        weapon: {
          id: weapon.id,
          name: weapon.name,
          winChance: weapon.winChance,
          cooldown: 0
        }
      }));
    }
  };

  const currentLocation = priceState.locations.find(
    loc => loc.id === gameState.currentLocation
  );

  return (
    <div className="min-h-screen bg-game-background">
      <StatsBar gameState={gameState} />
      <div className="p-4 pt-24">
        <div className="grid md:grid-cols-2 gap-4">
          <LocationsContainer
            locations={priceState.locations}
            currentLocation={gameState.currentLocation}
            onTravel={handleTravel}
            gameState={gameState}
            setGameState={setGameState}
          />
          
          <div>
            {currentLocation && (
              <MarketContainer
                gameState={gameState}
                currentLocationPrices={currentLocation.prices}
                items={items}
                onBuy={handleBuy}
                onSell={handleSell}
                onBuyWeapon={handleBuyWeapon}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
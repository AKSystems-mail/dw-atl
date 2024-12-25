import { GameLayout } from "../components/layout/GameLayout";
import { useGameState } from "../hooks/useGameState";
import { useMarket } from "../hooks/useMarket";
import { useTravel } from "../hooks/useTravel";
import { generatePrices } from "../data/gameData";

const Index = () => {
  const { gameState, setGameState, handleBuyWeapon, handleWeaponUse } = useGameState();
  const { priceState, setPriceState, handleBuy, handleSell } = useMarket(gameState, setGameState);
  const { handleTravel } = useTravel(setGameState, setPriceState, generatePrices);

  const currentLocation = priceState.locations.find(
    loc => loc.id === gameState.currentLocation
  );

  return (
    <GameLayout
      gameState={gameState}
      setGameState={setGameState}
      locations={priceState.locations}
      currentLocation={currentLocation}
      onTravel={handleTravel}
      onBuy={handleBuy}
      onSell={handleSell}
      onBuyWeapon={handleBuyWeapon}
      onWeaponUse={handleWeaponUse}
    />
  );
};

export default Index;
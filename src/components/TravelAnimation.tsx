import { useEffect } from "react";
import { Car, Bus, CarFront } from "lucide-react";

interface TravelAnimationProps {
  travelMethod: string;
  onComplete: () => void;
}

export const TravelAnimation = ({ travelMethod, onComplete }: TravelAnimationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    if (travelMethod === "marta") {
      const audio = new Audio("/marta-chime.mp3");
      audio.play().catch(error => {
        console.log("Audio playback failed:", error);
      });
    }

    return () => clearTimeout(timer);
  }, [onComplete, travelMethod]);

  const getIcon = () => {
    switch (travelMethod) {
      case "marta":
        return <Bus className="w-16 h-16" />;
      case "ryde":
        return <CarFront className="w-16 h-16" />;
      case "drive":
        return <Car className="w-16 h-16" />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="animate-bounce text-game-accent">
        {getIcon()}
      </div>
    </div>
  );
};
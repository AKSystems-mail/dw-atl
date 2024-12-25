import { Location } from "../../types/game";
import { motion } from "framer-motion";

interface AtlantaMapProps {
  locations: Location[];
  currentLocation: string;
  onLocationSelect: (locationId: string) => void;
}

export const AtlantaMap = ({ locations, currentLocation, onLocationSelect }: AtlantaMapProps) => {
  return (
    <div className="w-full h-[60vh] bg-game-background rounded-lg p-4">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full"
        style={{ maxHeight: "600px" }}
      >
        {/* Highways */}
        <g className="highways">
          {/* I-285 Perimeter */}
          <path
            d="M 200,100 A 200,200 0 1,1 200,500"
            fill="none"
            stroke="#444"
            strokeWidth="8"
            className="opacity-30"
          />
          
          {/* I-75/85 Connector */}
          <path
            d="M 400,50 L 400,550"
            fill="none"
            stroke="#444"
            strokeWidth="8"
            className="opacity-30"
          />
          
          {/* I-20 */}
          <path
            d="M 100,300 L 700,300"
            fill="none"
            stroke="#444"
            strokeWidth="8"
            className="opacity-30"
          />
        </g>

        {/* Location Markers */}
        <g className="locations">
          {/* Midtown */}
          <motion.circle
            cx="400"
            cy="250"
            r="20"
            className={`cursor-pointer ${
              currentLocation === "midtown"
                ? "fill-game-accent stroke-white"
                : "fill-game-card hover:fill-game-accent/50"
            }`}
            onClick={() => onLocationSelect("midtown")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
          <text x="420" y="255" className="fill-white text-sm">Midtown</text>

          {/* Buckhead */}
          <motion.circle
            cx="400"
            cy="150"
            r="20"
            className={`cursor-pointer ${
              currentLocation === "buckhead"
                ? "fill-game-accent stroke-white"
                : "fill-game-card hover:fill-game-accent/50"
            }`}
            onClick={() => onLocationSelect("buckhead")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
          <text x="420" y="155" className="fill-white text-sm">Buckhead</text>

          {/* West End */}
          <motion.circle
            cx="400"
            cy="350"
            r="20"
            className={`cursor-pointer ${
              currentLocation === "westend"
                ? "fill-game-accent stroke-white"
                : "fill-game-card hover:fill-game-accent/50"
            }`}
            onClick={() => onLocationSelect("westend")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
          <text x="420" y="355" className="fill-white text-sm">West End</text>

          {/* Little Five Points */}
          <motion.circle
            cx="500"
            cy="250"
            r="20"
            className={`cursor-pointer ${
              currentLocation === "littlefive"
                ? "fill-game-accent stroke-white"
                : "fill-game-card hover:fill-game-accent/50"
            }`}
            onClick={() => onLocationSelect("littlefive")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
          <text x="520" y="255" className="fill-white text-sm">L5P</text>

          {/* Decatur */}
          <motion.circle
            cx="600"
            cy="250"
            r="20"
            className={`cursor-pointer ${
              currentLocation === "decatur"
                ? "fill-game-accent stroke-white"
                : "fill-game-card hover:fill-game-accent/50"
            }`}
            onClick={() => onLocationSelect("decatur")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
          <text x="620" y="255" className="fill-white text-sm">Decatur</text>

          {/* Cobb County */}
          <motion.circle
            cx="300"
            cy="150"
            r="20"
            className={`cursor-pointer ${
              currentLocation === "cobbcounty"
                ? "fill-game-accent stroke-white"
                : "fill-game-card hover:fill-game-accent/50"
            }`}
            onClick={() => onLocationSelect("cobbcounty")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
          <text x="320" y="155" className="fill-white text-sm">Cobb</text>
        </g>
      </svg>
    </div>
  );
};
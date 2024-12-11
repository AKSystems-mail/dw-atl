import { TravelOption, GameState } from "../types/game";

export const travelOptions: TravelOption[] = [
  {
    id: "marta",
    name: "MARTA",
    getPrice: () => 5,
    available: (from, to) => {
      return !([from, to].includes("cobbcounty"));
    },
    risk: {
      chance: 0.13,
      type: "MARTA police",
      escape: {
        run: { chance: 0.94, penalty: { inventory: 0.15, cash: 0.15 } },
        fight: { chance: 0.08, penalty: { inventory: 0.4, cash: 0.5 } }
      }
    }
  },
  {
    id: "drive",
    name: "Drive",
    getPrice: (from, to) => {
      if (from === "cobbcounty" || to === "cobbcounty") {
        return 30;
      }
      return 20;
    },
    available: () => true,
    risk: {
      chance: (_, to) => to === "midtown" ? 0.08 : 0.09,
      type: (to) => to === "midtown" ? "Water Boys" : "GSP",
      escape: {
        run: { 
          chance: 0.11, 
          penalty: { 
            inventory: (to) => to === "midtown" ? 0.3 : 1, 
            cash: (to) => to === "midtown" ? 0.3 : 1 
          } 
        }
      }
    }
  },
  {
    id: "ryde",
    name: "Ryde",
    getPrice: (from, to) => {
      if (from === "cobbcounty" || to === "cobbcounty") {
        return 60;
      }
      return 25;
    },
    available: () => true,
    risk: {
      chance: (_, __, gameState: GameState) => gameState.debt === 0 ? 0.01 : 0.03,
      type: "undercover cop",
      escape: {
        bribe: { chance: 0.4, penalty: { inventory: 1, cash: 0.5 } }
      }
    }
  }
];

export const locationRisks = {
  westend: {
    chance: 0.10,
    type: "YNs",
    escape: {
      run: { chance: 0.78, penalty: { inventory: 0.2, cash: 0.2 } },
      fight: { 
        chance: 0.5, 
        penalty: { inventory: 1, cash: 1 },
        requiresWeapon: true 
      }
    }
  }
};
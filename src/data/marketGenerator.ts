import { Item, Location } from "../types/game";
import { items } from "./items";
import { locations } from "./locations";

const generateMarketCondition = () => {
  const rand = Math.random();
  if (rand < 0.15) return 'high-demand';
  if (rand < 0.30) return 'flooded';
  return 'normal';
};

const getAffectedItems = (items: Item[]) => {
  return items
    .sort(() => Math.random() - 0.5)
    .slice(0, 1 + Math.floor(Math.random() * 2));
};

export const generatePrices = () => {
  return locations.map(location => {
    const marketCondition = generateMarketCondition();
    const availableItems = [...items]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3 + Math.floor(Math.random() * 2));

    const affectedItems = getAffectedItems(availableItems);
    const affectedItemIds = new Set(affectedItems.map(item => item.id));

    const prices = Object.fromEntries(
      availableItems.map(item => {
        let price;
        if (affectedItemIds.has(item.id)) {
          if (marketCondition === 'high-demand') {
            price = Math.floor(item.maxPrice * (0.9 + Math.random() * 0.1));
          } else if (marketCondition === 'flooded') {
            price = Math.floor(item.minPrice * (1 + Math.random() * 0.1));
          } else {
            price = Math.floor(item.basePrice * (0.5 + Math.random()));
          }
        } else {
          price = Math.floor(item.basePrice * (0.5 + Math.random()));
        }
        return [item.id, price];
      })
    );

    return {
      ...location,
      prices,
    };
  });
};
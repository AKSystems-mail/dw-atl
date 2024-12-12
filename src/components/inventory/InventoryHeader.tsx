interface InventoryHeaderProps {
  currentSize: number;
  capacity: number;
}

export const InventoryHeader = ({ currentSize, capacity }: InventoryHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-bold text-white">Inventory</h3>
      <div className="text-sm text-game-accent">
        Capacity: {currentSize} / {capacity}
      </div>
    </div>
  );
};
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { GameState } from "../types/game";
import { toast } from "@/components/ui/use-toast";

interface DebtRepaymentProps {
  gameState: GameState;
  setGameState: (state: GameState) => void;
}

export const DebtRepayment = ({ gameState, setGameState }: DebtRepaymentProps) => {
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);

  const handleRepayment = () => {
    const repaymentAmount = Number(amount);
    
    if (isNaN(repaymentAmount) || repaymentAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid repayment amount.",
      });
      return;
    }

    if (repaymentAmount > gameState.money) {
      toast({
        title: "Insufficient Funds",
        description: "You don't have enough money for this repayment.",
      });
      return;
    }

    if (repaymentAmount > gameState.debt) {
      toast({
        title: "Excessive Payment",
        description: "You can't repay more than you owe.",
      });
      return;
    }

    setGameState({
      ...gameState,
      money: gameState.money - repaymentAmount,
      debt: gameState.debt - repaymentAmount,
    });

    toast({
      title: "Debt Payment Successful",
      description: `You've repaid $${repaymentAmount} of your debt.`,
    });
    
    setAmount("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full mt-4 bg-game-accent hover:bg-game-accent/80 text-black"
        >
          Repay Debt (${gameState.debt})
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-game-card border-game-accent">
        <DialogHeader>
          <DialogTitle className="text-white">Repay Your Debt</DialogTitle>
          <DialogDescription className="text-gray-400">
            Current debt: ${gameState.debt} | Available cash: ${gameState.money}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount to repay"
            className="bg-game-background text-white border-game-accent"
            min={0}
            max={Math.min(gameState.debt, gameState.money)}
          />
          <Button
            onClick={handleRepayment}
            className="w-full bg-game-accent hover:bg-game-accent/80 text-black"
          >
            Make Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
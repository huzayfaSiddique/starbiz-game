"use client";

import React, { useState } from "react";
import { Trophy, Sparkles, X, ChevronRight, Gift } from "lucide-react";
import confetti from "canvas-confetti";
import { cosmicAudio } from "@/lib/audio/cosmic-sfx";

interface TableLotteryConsoleProps {
  activePlayerId: string;
  activePlayerName: string;
  onModifyStars: (playerId: string, delta: number) => void;
  onTriggerAppreciation?: () => void;
}

export default function TableLotteryConsole({
  activePlayerId,
  activePlayerName,
  onModifyStars,
  onTriggerAppreciation,
}: TableLotteryConsoleProps) {
  const [ticketPool, setTicketPool] = useState<number>(28);
  const [totalDrawsCount, setTotalDrawsCount] = useState<number>(0);
  const [showJackpotModal, setShowJackpotModal] = useState<boolean>(false);

  // Buy Tickets
  const handleBuyTickets = (count: number, cost: number) => {
    cosmicAudio.playTicketBuy();
    // Deduct cost from active player
    onModifyStars(activePlayerId, -cost);

    const newCount = ticketPool + count;
    if (newCount >= 38) {
      setTicketPool(newCount);
      triggerJackpotDraw();
    } else {
      setTicketPool(newCount);
    }
  };

  // Trigger Jackpot
  const triggerJackpotDraw = () => {
    cosmicAudio.playJackpotFanfare();
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#ffd026", "#00f0ff", "#00ff88", "#b829ff"],
    });
    setShowJackpotModal(true);
  };

  // Credit 1st Prize to Active Tycoon
  const handleClaimFirstPrize = () => {
    onModifyStars(activePlayerId, 1400);
    handleCloseModal(true);
  };

  const handleCloseModal = (proceedToApprec: boolean = false) => {
    setShowJackpotModal(false);
    setTicketPool(0);
    setTotalDrawsCount((prev) => prev + 1);
    if (proceedToApprec && onTriggerAppreciation) {
      onTriggerAppreciation();
    }
  };

  const poolPercentage = Math.min(100, Math.round((ticketPool / 40) * 100));

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#18263e] to-[#0d1624] border-2 border-[#c89b3c]/50 p-4 sm:p-5 flex flex-col gap-3 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#ffd026]" />
          <span className="font-orbitron font-extrabold text-xs text-slate-100 tracking-wider">
            GALACTIC LOTTERY CONSOLE
          </span>
        </div>
        <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded-full bg-slate-900 text-[#ffd026] border border-[#c89b3c]/40">
          DRAWS: {totalDrawsCount} COMPLETED
        </span>
      </div>

      {/* Progress Box */}
      <div className="p-3.5 rounded-xl bg-black/40 border border-slate-800 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-rajdhani font-bold text-slate-300">
            Collective Ticket Pool
          </span>
          <span className="font-orbitron font-black text-sm text-[#ffd026]">
            {ticketPool} / 40 <span className="text-[11px] font-normal text-slate-400">TICKETS</span>
          </span>
        </div>

        {/* Meter */}
        <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-700 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              ticketPool >= 34
                ? "bg-gradient-to-r from-[#e6b957] via-[#ffd026] to-amber-500 animate-pulse"
                : "bg-gradient-to-r from-cyan-500 to-[#e6b957]"
            }`}
            style={{ width: `${poolPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] font-rajdhani text-slate-400">
          <span>Threshold: 38–40 Tickets</span>
          <span>1st Prize: 1,400★ • 2nd: 700★ + 1 Ticket</span>
        </div>
      </div>

      {/* Ticket Action Buttons (Deducts directly from active player) */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => handleBuyTickets(1, 60)}
          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#c89b3c] text-center transition flex flex-col items-center justify-center cursor-pointer group"
        >
          <span className="font-orbitron font-black text-sm text-[#ffd026] group-hover:scale-110 transition-transform">
            +1 TICKET
          </span>
          <span className="text-[10px] font-rajdhani font-bold text-slate-300">Pay 60★</span>
        </button>

        <button
          onClick={() => handleBuyTickets(2, 120)}
          className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-[#c89b3c] text-center transition flex flex-col items-center justify-center cursor-pointer group"
        >
          <span className="font-orbitron font-black text-sm text-[#ffd026] group-hover:scale-110 transition-transform">
            +2 TICKETS
          </span>
          <span className="text-[10px] font-rajdhani font-bold text-slate-300">Pay 120★</span>
        </button>

        <button
          onClick={() => handleBuyTickets(6, 240)}
          className="p-2.5 rounded-xl bg-[#c89b3c]/20 hover:bg-[#c89b3c]/30 border border-[#c89b3c] text-center transition flex flex-col items-center justify-center cursor-pointer group"
        >
          <span className="font-orbitron font-black text-sm text-[#ffd026] group-hover:scale-110 transition-transform">
            +6 STARSHOP
          </span>
          <span className="text-[10px] font-rajdhani font-bold text-amber-200">Wholesale (240★)</span>
        </button>
      </div>

      {/* Full-Screen Jackpot Modal */}
      {showJackpotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl p-6 relative bg-gradient-to-b from-[#241c09] via-[#161205] to-[#0a0802] border-4 border-[#c89b3c] shadow-2xl text-center text-slate-100">
            {/* Close */}
            <button
              onClick={() => handleCloseModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-slate-400 hover:text-white transition"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <Trophy className="w-12 h-12 text-[#ffd026] mx-auto mb-2 animate-bounce" />
            <span className="text-[10px] font-orbitron font-black uppercase tracking-widest text-[#e6b957]">
              POOL REACHED 38+ TICKETS
            </span>
            <h2 className="font-orbitron text-2xl font-black text-white mt-1 drop-shadow-md">
              GALACTIC LOTTERY DRAW
            </h2>

            {/* Prizes */}
            <div className="space-y-3 my-5">
              <div className="p-3.5 rounded-2xl bg-[#ffd026]/15 border-2 border-[#ffd026] flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] font-rajdhani font-black text-[#ffd026] uppercase tracking-wider block">
                    1st Prize Jackpot
                  </span>
                  <span className="font-orbitron font-black text-xl text-white">
                    1,400 ★ STARS
                  </span>
                </div>
                <button
                  onClick={handleClaimFirstPrize}
                  className="px-3 py-1.5 rounded-xl bg-[#ffd026] text-black font-orbitron font-black text-xs hover:bg-yellow-400 shadow-md transition"
                >
                  Credit {activePlayerName.split(" ")[0]}
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-400/50 flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] font-rajdhani font-black text-cyan-400 uppercase tracking-wider block">
                    2nd Prize (Runner-Up)
                  </span>
                  <span className="font-orbitron font-black text-lg text-white">
                    700 ★ + 1 Free Ticket
                  </span>
                </div>
                <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300">
                  AWARD TO RUNNER-UP
                </span>
              </div>
            </div>

            <button
              onClick={() => handleCloseModal(true)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#c89b3c] to-[#ffd026] text-black font-orbitron font-black text-xs uppercase tracking-wider shadow-md hover:brightness-110 flex items-center justify-center gap-2 transition"
            >
              <span>Proceed to Market Appreciation Boom</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

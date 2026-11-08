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

  const handleBuyTickets = (count: number, cost: number) => {
    cosmicAudio.playTicketBuy();
    onModifyStars(activePlayerId, -cost);

    const newCount = ticketPool + count;
    if (newCount >= 38) {
      setTicketPool(newCount);
      triggerJackpotDraw();
    } else {
      setTicketPool(newCount);
    }
  };

  const triggerJackpotDraw = () => {
    cosmicAudio.playJackpotFanfare();
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#00B4D8", "#2A9D8F", "#9D4EDD"],
    });
    setShowJackpotModal(true);
  };

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
    <div className="w-full tabletop-card p-4 sm:p-5 flex flex-col gap-3 border-2 border-[#D4AF37]/70 shadow-parchment-card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#8C6518]" />
          <span className="font-orbitron font-extrabold text-xs text-ink-navy tracking-wider">
            GALACTIC LOTTERY CONSOLE
          </span>
        </div>
        <span className="text-[10px] font-rajdhani font-black px-2 py-0.5 rounded-full gold-badge">
          DRAWS: {totalDrawsCount} COMPLETED
        </span>
      </div>

      {/* Progress Box */}
      <div className="p-3.5 rounded-xl bg-[#FAF5EA] border border-[#E2D5C3] flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-rajdhani font-black text-ink-navy">
            Collective Ticket Pool
          </span>
          <span className="font-orbitron font-black text-sm text-[#8C6518]">
            {ticketPool} / 40 <span className="text-[11px] font-normal text-slate-500">TICKETS</span>
          </span>
        </div>

        {/* Meter */}
        <div className="w-full h-3.5 rounded-full bg-white overflow-hidden border border-[#E2D5C3] p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              ticketPool >= 34
                ? "bg-gradient-to-r from-[#D4AF37] via-[#C89B3C] to-rose-600 animate-pulse"
                : "bg-gradient-to-r from-[#1B4965] to-[#D4AF37]"
            }`}
            style={{ width: `${poolPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] font-rajdhani text-slate-600 font-bold">
          <span>Threshold: 38–40 Tickets</span>
          <span>1st: 1,400★ • 2nd: 700★ + 1 Ticket</span>
        </div>
      </div>

      {/* Ticket Action Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => handleBuyTickets(1, 60)}
          className="p-2.5 rounded-xl bg-[#FAF5EA] hover:bg-[#F4ECE0] border border-[#E2D5C3] hover:border-[#D4AF37] text-center transition flex flex-col items-center justify-center cursor-pointer group"
        >
          <span className="font-orbitron font-black text-sm text-ink-navy group-hover:scale-110 transition-transform">
            +1 TICKET
          </span>
          <span className="text-[10px] font-rajdhani font-bold text-slate-600">Pay 60★</span>
        </button>

        <button
          onClick={() => handleBuyTickets(2, 120)}
          className="p-2.5 rounded-xl bg-[#FAF5EA] hover:bg-[#F4ECE0] border border-[#E2D5C3] hover:border-[#D4AF37] text-center transition flex flex-col items-center justify-center cursor-pointer group"
        >
          <span className="font-orbitron font-black text-sm text-ink-navy group-hover:scale-110 transition-transform">
            +2 TICKETS
          </span>
          <span className="text-[10px] font-rajdhani font-bold text-slate-600">Pay 120★</span>
        </button>

        <button
          onClick={() => handleBuyTickets(6, 240)}
          className="p-2.5 rounded-xl bg-[#FFF6E0] hover:bg-[#F5E5BE] border border-[#D4AF37] text-center transition flex flex-col items-center justify-center cursor-pointer group"
        >
          <span className="font-orbitron font-black text-sm text-[#7A5712] group-hover:scale-110 transition-transform">
            +6 STARSHOP
          </span>
          <span className="text-[10px] font-rajdhani font-extrabold text-[#8C6518]">Wholesale (240★)</span>
        </button>
      </div>

      {/* Full-Screen Jackpot Modal */}
      {showJackpotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl p-6 relative bg-[#FAF5EA] border-4 border-[#D4AF37] shadow-2xl text-center text-ink-navy">
            {/* Close */}
            <button
              onClick={() => handleCloseModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/10 text-slate-700 hover:text-black transition"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>

            <Trophy className="w-12 h-12 text-[#8C6518] mx-auto mb-2 animate-bounce" />
            <span className="text-[10px] font-orbitron font-black uppercase tracking-widest text-[#8C6518]">
              POOL REACHED 38+ TICKETS
            </span>
            <h2 className="font-orbitron text-2xl font-black text-ink-navy mt-1">
              GALACTIC LOTTERY DRAW
            </h2>

            {/* Prizes */}
            <div className="space-y-3 my-5">
              <div className="p-3.5 rounded-2xl bg-[#FFF6E0] border-2 border-[#D4AF37] flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] font-rajdhani font-black text-[#8C6518] uppercase tracking-wider block">
                    1st Prize Jackpot
                  </span>
                  <span className="font-orbitron font-black text-xl text-ink-navy">
                    1,400 ★ STARS
                  </span>
                </div>
                <button
                  onClick={handleClaimFirstPrize}
                  className="px-3 py-1.5 rounded-xl gold-button font-orbitron font-black text-xs uppercase"
                >
                  Credit {activePlayerName.split(" ")[0]}
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E2D5C3] flex items-center justify-between text-left">
                <div>
                  <span className="text-[10px] font-rajdhani font-black text-[#1B4965] uppercase tracking-wider block">
                    2nd Prize (Runner-Up)
                  </span>
                  <span className="font-orbitron font-black text-lg text-ink-navy">
                    700 ★ + 1 Free Ticket
                  </span>
                </div>
                <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded bg-[#FAF5EA] text-slate-700 border border-[#E2D5C3]">
                  AWARD TO RUNNER-UP
                </span>
              </div>
            </div>

            <button
              onClick={() => handleCloseModal(true)}
              className="w-full py-3 rounded-xl gold-button font-orbitron font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2"
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

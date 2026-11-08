"use client";

import React, { useState } from "react";
import { Trophy, Ticket, Sparkles, X, ChevronRight, Gift } from "lucide-react";
import confetti from "canvas-confetti";
import { cosmicAudio } from "@/lib/audio/cosmic-sfx";

interface LotteryConsoleProps {
  onTriggerAppreciation?: () => void;
  activePlayerName: string;
}

export default function LotteryConsole({ onTriggerAppreciation, activePlayerName }: LotteryConsoleProps) {
  const [ticketPool, setTicketPool] = useState<number>(28); // Sample starter pool
  const [totalDrawsCount, setTotalDrawsCount] = useState<number>(0);
  const [showJackpotModal, setShowJackpotModal] = useState<boolean>(false);

  // Buy Tickets
  const addTickets = (count: number) => {
    cosmicAudio.playTicketBuy();
    const newCount = ticketPool + count;

    if (newCount >= 38) {
      setTicketPool(newCount);
      triggerJackpotDraw();
    } else {
      setTicketPool(newCount);
    }
  };

  // Trigger Jackpot Draw
  const triggerJackpotDraw = () => {
    cosmicAudio.playJackpotFanfare();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#00f0ff", "#ffd026", "#00ff88", "#b829ff"],
    });
    setShowJackpotModal(true);
  };

  // Close Draw Modal
  const handleCloseJackpot = (triggerApprec: boolean = false) => {
    setShowJackpotModal(false);
    setTicketPool(0);
    setTotalDrawsCount((prev) => prev + 1);
    if (triggerApprec && onTriggerAppreciation) {
      onTriggerAppreciation();
    }
  };

  const poolPercentage = Math.min(100, Math.round((ticketPool / 40) * 100));

  return (
    <div className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col gap-3 border border-cyan-500/30">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-cyan-400" />
          <span className="font-orbitron font-extrabold text-xs text-slate-200 tracking-wider">
            GALACTIC LOTTERY CONSOLE
          </span>
        </div>
        <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-400/40">
          DRAWS: {totalDrawsCount} COMPLETED
        </span>
      </div>

      {/* Progress Bar & Current Pool */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-rajdhani font-bold text-slate-300">
            Current Pool Progress
          </span>
          <span className="font-orbitron font-black text-sm text-cyan-300">
            {ticketPool} / 40 <span className="text-[11px] font-normal text-slate-400">TICKETS</span>
          </span>
        </div>

        {/* Meter Bar */}
        <div className="w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-slate-700/60 p-0.5">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              ticketPool >= 34
                ? "bg-gradient-to-r from-cyan-400 via-amber-400 to-rose-500 animate-pulse"
                : "bg-gradient-to-r from-cyan-500 to-blue-500"
            }`}
            style={{ width: `${poolPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] font-rajdhani text-slate-400">
          <span>Draw Threshold: 38–40 Tickets</span>
          <span>Jackpot: 1,400★ + 700★</span>
        </div>
      </div>

      {/* Ticket Action Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => addTickets(1)}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-center transition flex flex-col items-center justify-center cursor-pointer group"
        >
          <span className="font-orbitron font-black text-sm text-cyan-300 group-hover:scale-110 transition-transform">
            +1
          </span>
          <span className="text-[10px] font-rajdhani font-bold text-slate-300">60 Stars</span>
        </button>

        <button
          onClick={() => addTickets(2)}
          className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-400 text-center transition flex flex-col items-center justify-center cursor-pointer group"
        >
          <span className="font-orbitron font-black text-sm text-cyan-300 group-hover:scale-110 transition-transform">
            +2
          </span>
          <span className="text-[10px] font-rajdhani font-bold text-slate-300">120 Stars</span>
        </button>

        <button
          onClick={() => addTickets(6)}
          className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-950/80 to-blue-950/80 hover:from-cyan-900/80 hover:to-blue-900/80 border border-cyan-400/60 shadow-cyan-glow text-center transition flex flex-col items-center justify-center cursor-pointer group"
        >
          <span className="font-orbitron font-black text-sm text-cyan-200 group-hover:scale-110 transition-transform">
            +6
          </span>
          <span className="text-[10px] font-rajdhani font-bold text-cyan-300">STARSHOP (40★/ea)</span>
        </button>
      </div>

      {/* Full-Screen Jackpot Winner Modal */}
      {showJackpotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl p-6 relative bg-gradient-to-b from-[#07132a] via-[#091838] to-[#040916] border-2 border-cyan-400 shadow-[0_0_50px_rgba(0,240,255,0.4)] text-center">
            {/* Close Button */}
            <button
              onClick={() => handleCloseJackpot(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-900/80 text-slate-400 hover:text-white transition"
              aria-label="Close Modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Glowing Trophy */}
            <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-cyan-glow mb-3">
              <Trophy className="w-8 h-8 text-cyan-300 animate-bounce" />
            </div>

            <span className="text-[10px] font-orbitron font-extrabold uppercase tracking-widest text-cyan-400">
              POOL HIT 38+ TICKETS
            </span>
            <h2 className="font-orbitron text-2xl font-black text-white text-glow-cyan mt-1">
              GALACTIC LOTTERY DRAW
            </h2>
            <p className="text-slate-300 text-xs mt-1 font-rajdhani">
              Prizes awarded across connected tycoons!
            </p>

            {/* Prize Cards */}
            <div className="space-y-3 my-5">
              {/* 1st Prize */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-transparent border border-amber-400/60 flex items-center justify-between text-left shadow-yellow-glow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/30 flex items-center justify-center text-amber-300 font-black font-orbitron text-lg">
                    1st
                  </div>
                  <div>
                    <span className="text-[10px] font-rajdhani font-bold text-amber-400 uppercase tracking-wider block">
                      First Prize Jackpot
                    </span>
                    <span className="font-orbitron font-black text-lg text-amber-200">
                      1,400 ★ STARS
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-rajdhani font-bold">
                  CREDITED
                </span>
              </div>

              {/* 2nd Prize */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 via-cyan-400/10 to-transparent border border-cyan-400/60 flex items-center justify-between text-left shadow-cyan-glow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/30 flex items-center justify-center text-cyan-300 font-black font-orbitron text-lg">
                    2nd
                  </div>
                  <div>
                    <span className="text-[10px] font-rajdhani font-bold text-cyan-400 uppercase tracking-wider block">
                      Runner-Up Prize
                    </span>
                    <span className="font-orbitron font-black text-lg text-cyan-200">
                      700 ★ + 1 TICKET
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-400/20 text-cyan-300 text-[10px] font-rajdhani font-bold">
                  CREDITED
                </span>
              </div>
            </div>

            {/* Handover to Appreciation Draw Button */}
            <button
              onClick={() => handleCloseJackpot(true)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-orbitron font-extrabold text-xs uppercase tracking-wider shadow-yellow-glow flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>Proceed to Market Appreciation Draw</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

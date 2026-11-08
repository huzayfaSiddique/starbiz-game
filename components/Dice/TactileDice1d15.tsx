"use client";

import React, { useState } from "react";
import { Dices, Sparkles } from "lucide-react";
import { cosmicAudio } from "@/lib/audio/cosmic-sfx";

interface TactileDice1d15Props {
  currentRoll: number;
  onRollComplete: (val: number) => void;
}

export default function TactileDice1d15({ currentRoll, onRollComplete }: TactileDice1d15Props) {
  const [displayVal, setDisplayVal] = useState<number>(currentRoll || 12);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollHistory, setRollHistory] = useState<number[]>([currentRoll || 12]);

  const handleRoll = () => {
    if (isRolling) return;
    setIsRolling(true);
    cosmicAudio.playDiceRoll();

    let cycles = 0;
    const interval = setInterval(() => {
      const rand = Math.floor(Math.random() * 15) + 1;
      setDisplayVal(rand);
      cycles++;

      if (cycles > 11) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 15) + 1;
        setDisplayVal(finalVal);
        setIsRolling(false);
        setRollHistory((prev) => [finalVal, ...prev.slice(0, 4)]);
        onRollComplete(finalVal);
      }
    }, 50);
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#18263e] to-[#0d1624] border-2 border-[#c89b3c]/50 p-4 sm:p-5 flex flex-col items-center shadow-lg relative overflow-hidden">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Dices className="w-4 h-4 text-[#e2b04a]" />
          <span className="font-orbitron font-extrabold text-xs text-slate-100 tracking-wider">
            1D15 PROPULSION DIE
          </span>
        </div>
        <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded-full bg-slate-900 text-[#e6b957] border border-[#c89b3c]/40">
          VALUES 1 TO 15
        </span>
      </div>

      {/* Tactile Acrylic Beveled Die Core */}
      <button
        onClick={handleRoll}
        disabled={isRolling}
        className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full my-3 flex flex-col items-center justify-center relative cursor-pointer group transition-all select-none shadow-[0_10px_30px_rgba(0,0,0,0.6)] ${
          isRolling
            ? "animate-diceShake scale-102"
            : "hover:scale-105 active:scale-95"
        }`}
        style={{
          background: "radial-gradient(circle at 35% 35%, #2a4365 0%, #17283c 60%, #0c1622 100%)",
          border: "4px solid #c89b3c",
          boxShadow: "0 0 25px rgba(200, 155, 60, 0.35), inset 0 2px 15px rgba(255, 255, 255, 0.2)",
        }}
        title="Tap to Roll 1d15 Spaceship Propulsion Die"
        aria-label="Roll Die"
      >
        {/* Subtle decorative inner ring */}
        <div className="absolute inset-2 rounded-full border border-[#c89b3c]/30 pointer-events-none" />

        <span className="font-orbitron text-5xl sm:text-6xl font-black text-[#ffd026] leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
          {displayVal}
        </span>
        <span className="text-[10px] sm:text-[11px] font-rajdhani font-extrabold text-slate-300 tracking-widest uppercase mt-1">
          {isRolling ? "PROPULSION..." : "TAP TO ROLL"}
        </span>
      </button>

      {/* History Pill */}
      <div className="w-full flex items-center justify-between text-xs font-rajdhani text-slate-400 pt-2 border-t border-slate-800">
        <span>Recent Rolls:</span>
        <div className="flex items-center gap-1.5">
          {rollHistory.map((val, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                idx === 0
                  ? "bg-[#c89b3c]/30 text-[#ffd026] border border-[#c89b3c]/60"
                  : "bg-slate-900 text-slate-400"
              }`}
            >
              {val}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

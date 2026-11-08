"use client";

import React, { useState } from "react";
import { Dices } from "lucide-react";
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
    <div className="w-full tabletop-card p-4 sm:p-5 flex flex-col items-center border-2 border-[#D4AF37]/70 shadow-parchment-card">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Dices className="w-4 h-4 text-[#8C6518]" />
          <span className="font-orbitron font-extrabold text-xs text-ink-navy tracking-wider">
            1D15 PROPULSION DIE
          </span>
        </div>
        <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded-full gold-badge">
          VALUES 1 TO 15
        </span>
      </div>

      {/* Tactile Ivory & Gold Die */}
      <button
        onClick={handleRoll}
        disabled={isRolling}
        className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full my-3 flex flex-col items-center justify-center relative cursor-pointer group transition-all select-none ${
          isRolling
            ? "animate-diceShake scale-102"
            : "hover:scale-105 active:scale-95"
        }`}
        style={{
          background: "radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FAF5EA 60%, #E8DFC8 100%)",
          border: "4px solid #D4AF37",
          boxShadow: "0 10px 25px rgba(138, 99, 54, 0.25), inset 0 2px 8px rgba(255, 255, 255, 0.9)",
        }}
        title="Tap to Roll 1d15 Spaceship Propulsion Die"
        aria-label="Roll Die"
      >
        {/* Subtle decorative inner ring */}
        <div className="absolute inset-2 rounded-full border border-[#D4AF37]/40 pointer-events-none" />

        <span className="font-orbitron text-5xl sm:text-6xl font-black text-ink-navy leading-none drop-shadow-[0_2px_4px_rgba(138,99,54,0.3)]">
          {displayVal}
        </span>
        <span className="text-[10px] sm:text-[11px] font-rajdhani font-black text-[#8C6518] tracking-widest uppercase mt-1">
          {isRolling ? "PROPULSION..." : "TAP TO ROLL"}
        </span>
      </button>

      {/* History Pill */}
      <div className="w-full flex items-center justify-between text-xs font-rajdhani text-slate-500 pt-2 border-t border-[#E2D5C3]">
        <span className="font-bold">Recent Rolls:</span>
        <div className="flex items-center gap-1.5">
          {rollHistory.map((val, idx) => (
            <span
              key={idx}
              className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold ${
                idx === 0
                  ? "bg-[#FFF6E0] text-[#8C6518] border border-[#D4AF37]"
                  : "bg-[#FAF5EA] text-slate-600 border border-[#E2D5C3]"
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

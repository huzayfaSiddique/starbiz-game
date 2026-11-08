"use client";

import React, { useState } from "react";
import { Dices, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import { cosmicAudio } from "@/lib/audio/cosmic-sfx";

interface Dice1d15ConsoleProps {
  onRollComplete?: (val: number) => void;
  lastRoll: number;
}

export default function Dice1d15Console({ onRollComplete, lastRoll }: Dice1d15ConsoleProps) {
  const [currentVal, setCurrentVal] = useState<number>(lastRoll || 12);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [rollHistory, setRollHistory] = useState<number[]>([lastRoll || 12]);

  const rollDice = () => {
    if (isRolling) return;
    setIsRolling(true);
    cosmicAudio.playDiceRoll();

    let rollCount = 0;
    const interval = setInterval(() => {
      // Rapidly cycle values between 1 and 15
      const tempVal = Math.floor(Math.random() * 15) + 1;
      setCurrentVal(tempVal);
      rollCount++;

      if (rollCount > 10) {
        clearInterval(interval);
        const finalVal = Math.floor(Math.random() * 15) + 1;
        setCurrentVal(finalVal);
        setIsRolling(false);
        setRollHistory((prev) => [finalVal, ...prev.slice(0, 4)]);
        if (onRollComplete) onRollComplete(finalVal);
      }
    }, 55);
  };

  // Math evaluations for StarCards
  const isMod3 = currentVal % 3 === 0;
  const isMod4 = currentVal % 4 === 0;
  const isMod5 = currentVal % 5 === 0;
  const isOdd = currentVal % 2 !== 0;

  return (
    <div className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col items-center relative overflow-hidden border border-cyan-500/30">
      {/* Background glow orb */}
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl pointer-events-none" />

      {/* Header Label */}
      <div className="w-full flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Dices className="w-4 h-4 text-cyan-400" />
          <span className="font-orbitron font-extrabold text-xs text-slate-200 tracking-wider">
            1D15 PROPULSION DIE
          </span>
        </div>
        <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300">
          VALUES 1–15
        </span>
      </div>

      {/* Central Holographic 1d15 Die Orb */}
      <button
        onClick={rollDice}
        disabled={isRolling}
        className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full dice-orb-outer flex flex-col items-center justify-center relative cursor-pointer group transition-all select-none my-2 ${
          isRolling ? "animate-diceShake" : "hover:shadow-cyan-glow hover:scale-105"
        }`}
        title="Tap to Roll 1d15 Propulsion Dice"
        aria-label="Roll 1d15 Dice"
      >
        {/* Holographic facets overlay */}
        <div className="absolute inset-1.5 rounded-full border border-cyan-400/30 border-dashed animate-spin [animation-duration:18s] pointer-events-none" />

        <span className="font-orbitron text-4xl sm:text-5xl font-black text-cyan-200 text-glow-cyan leading-none drop-shadow-md">
          {currentVal}
        </span>
        <span className="text-[10px] sm:text-[11px] font-rajdhani font-bold text-cyan-400/90 tracking-widest uppercase mt-1">
          {isRolling ? "PROPULSION..." : "ROLL FUEL"}
        </span>
      </button>

      {/* Real-time Math Divisibility Tags for StarCards */}
      <div className="w-full mt-3 pt-3 border-t border-slate-800/80 flex flex-col gap-1.5">
        <span className="text-[10px] font-rajdhani font-semibold text-slate-400 uppercase tracking-wider text-center">
          Card Formula Evaluators (Roll: {currentVal})
        </span>

        <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-rajdhani font-bold">
          {/* Mod 3 Tag */}
          <div
            className={`px-2 py-1 rounded-lg border flex flex-col items-center justify-center transition ${
              isMod3
                ? "bg-emerald-950/70 border-emerald-400/60 text-emerald-300"
                : "bg-slate-900/60 border-slate-800 text-slate-500"
            }`}
          >
            <span className="text-[9px] uppercase">Divisible by 3</span>
            <span className="text-xs font-black">{isMod3 ? "YES" : "NO"}</span>
          </div>

          {/* Mod 4 Tag */}
          <div
            className={`px-2 py-1 rounded-lg border flex flex-col items-center justify-center transition ${
              isMod4
                ? "bg-emerald-950/70 border-emerald-400/60 text-emerald-300"
                : "bg-slate-900/60 border-slate-800 text-slate-500"
            }`}
          >
            <span className="text-[9px] uppercase">Divisible by 4</span>
            <span className="text-xs font-black">{isMod4 ? "YES" : "NO"}</span>
          </div>

          {/* Mod 5 Tag */}
          <div
            className={`px-2 py-1 rounded-lg border flex flex-col items-center justify-center transition ${
              isMod5
                ? "bg-emerald-950/70 border-emerald-400/60 text-emerald-300"
                : "bg-slate-900/60 border-slate-800 text-slate-500"
            }`}
          >
            <span className="text-[9px] uppercase">Divisible by 5</span>
            <span className="text-xs font-black">{isMod5 ? "YES" : "NO"}</span>
          </div>
        </div>

        {/* History Pills */}
        <div className="flex items-center justify-between text-[11px] font-rajdhani text-slate-400 mt-1 px-1">
          <span>Recent Rolls:</span>
          <div className="flex items-center gap-1">
            {rollHistory.map((val, idx) => (
              <span
                key={idx}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  idx === 0
                    ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/40"
                    : "bg-slate-800/80 text-slate-400"
                }`}
              >
                {val}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

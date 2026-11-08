"use client";

import React, { useState } from "react";
import { Layers, Sparkles, X, Shuffle, AlertTriangle, ShieldCheck } from "lucide-react";
import { YELLOW_STAR_CARDS, GREEN_STAR_CARDS, StarCard } from "@/lib/data/star-cards";
import { cosmicAudio } from "@/lib/audio/cosmic-sfx";

interface StarCardsConsoleProps {
  activeGalaxy: "ANDROMEDA" | "CENTAURUS" | "LYNX" | "MILKY WAY";
  lastDiceRoll: number;
}

export default function StarCardsConsole({ activeGalaxy, lastDiceRoll }: StarCardsConsoleProps) {
  // Deck state with Fisher-Yates shuffled arrays
  const [yellowRemaining, setYellowRemaining] = useState<number[]>(() =>
    Array.from({ length: YELLOW_STAR_CARDS.length }, (_, i) => i).sort(() => Math.random() - 0.5)
  );
  const [greenRemaining, setGreenRemaining] = useState<number[]>(() =>
    Array.from({ length: GREEN_STAR_CARDS.length }, (_, i) => i).sort(() => Math.random() - 0.5)
  );

  const [activeCard, setActiveCard] = useState<StarCard | null>(null);

  // Draw Yellow Card
  const drawYellowCard = () => {
    cosmicAudio.playCardDraw();
    let remaining = [...yellowRemaining];
    if (remaining.length === 0) {
      remaining = Array.from({ length: YELLOW_STAR_CARDS.length }, (_, i) => i).sort(() => Math.random() - 0.5);
    }
    const nextIdx = remaining.pop()!;
    setYellowRemaining(remaining);
    setActiveCard(YELLOW_STAR_CARDS[nextIdx]);
  };

  // Draw Green Card
  const drawGreenCard = () => {
    cosmicAudio.playCardDraw();
    let remaining = [...greenRemaining];
    if (remaining.length === 0) {
      remaining = Array.from({ length: GREEN_STAR_CARDS.length }, (_, i) => i).sort(() => Math.random() - 0.5);
    }
    const nextIdx = remaining.pop()!;
    setGreenRemaining(remaining);
    setActiveCard(GREEN_STAR_CARDS[nextIdx]);
  };

  return (
    <div className="glass-panel p-4 sm:p-5 rounded-2xl flex flex-col gap-3 border border-slate-700/60">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span className="font-orbitron font-extrabold text-xs text-slate-200 tracking-wider">
            STARCARDS ENGINE (48 CARDS)
          </span>
        </div>
        <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
          AUTHENTIC PDF ARTWORK
        </span>
      </div>

      {/* Dual Deck Draw Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Yellow Star Deck Button */}
        <button
          onClick={drawYellowCard}
          className="group relative p-3.5 rounded-xl bg-gradient-to-br from-[#2a1e05] to-[#140e02] border border-amber-400/60 shadow-yellow-glow hover:border-amber-300 transition-all text-left flex flex-col justify-between min-h-[90px] cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <span className="px-2 py-0.5 rounded text-[10px] font-orbitron font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40">
              DECK: {yellowRemaining.length} / 24
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          </div>
          <div>
            <span className="font-orbitron font-black text-sm text-amber-200 block text-glow-gold">
              DRAW YELLOW CARD
            </span>
            <span className="text-[11px] font-rajdhani text-amber-300/80 font-medium">
              Penalties, Taxes, Warp, Fines & Bonuses
            </span>
          </div>
        </button>

        {/* Green Star Deck Button */}
        <button
          onClick={drawGreenCard}
          className="group relative p-3.5 rounded-xl bg-gradient-to-br from-[#06241b] to-[#02120e] border border-emerald-400/60 shadow-green-glow hover:border-emerald-300 transition-all text-left flex flex-col justify-between min-h-[90px] cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <span className="px-2 py-0.5 rounded text-[10px] font-orbitron font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
              DECK: {greenRemaining.length} / 24
            </span>
            <Sparkles className="w-4 h-4 text-emerald-400 group-hover:scale-125 transition-transform" />
          </div>
          <div>
            <span className="font-orbitron font-black text-sm text-emerald-200 block text-glow-green">
              DRAW GREEN CARD
            </span>
            <span className="text-[11px] font-rajdhani text-emerald-300/80 font-medium">
              Telecom, Upgrades, Booms & Free Passes
            </span>
          </div>
        </button>
      </div>

      {/* Card Display Modal (Matching Authentic Physical StarCards) */}
      {activeCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div
            className={`w-full max-w-md rounded-2xl p-5 sm:p-6 relative shadow-2xl border-2 transition-all ${
              activeCard.deck === "YELLOW"
                ? "bg-gradient-to-b from-[#2b220c] via-[#1a1405] to-[#0c0902] border-amber-400 shadow-[0_0_40px_rgba(255,208,38,0.35)]"
                : "bg-gradient-to-b from-[#0a291f] via-[#051a13] to-[#020e0a] border-emerald-400 shadow-[0_0_40px_rgba(0,255,136,0.35)]"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCard(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/50 text-slate-300 hover:text-white hover:bg-black/80 transition"
              aria-label="Close Card"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Card Header */}
            <div className="text-center mb-4">
              <span
                className={`text-[10px] font-orbitron font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${
                  activeCard.deck === "YELLOW"
                    ? "bg-amber-400/15 border-amber-400/40 text-amber-300"
                    : "bg-emerald-400/15 border-emerald-400/40 text-emerald-300"
                }`}
              >
                {activeCard.deck} STAR CARD #{String(activeCard.id).padStart(2, "0")}
              </span>
              <h2
                className={`font-orbitron text-xl sm:text-2xl font-black tracking-wide mt-1.5 ${
                  activeCard.deck === "YELLOW" ? "text-amber-200 text-glow-gold" : "text-emerald-200 text-glow-green"
                }`}
              >
                {activeCard.title}
              </h2>
            </div>

            {/* Instruction Text */}
            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed text-center mb-4 font-medium px-2">
              {activeCard.instruction}
            </p>

            {/* Dynamic Galaxy Table */}
            {activeCard.values && (
              <div className="grid grid-cols-2 gap-2 my-3">
                {Object.entries(activeCard.values).map(([galaxy, val]) => {
                  const isCurrent = galaxy === activeGalaxy;
                  return (
                    <div
                      key={galaxy}
                      className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition ${
                        isCurrent
                          ? activeCard.deck === "YELLOW"
                            ? "bg-amber-400/25 border-amber-400 text-amber-100 shadow-md scale-102"
                            : "bg-emerald-400/25 border-emerald-400 text-emerald-100 shadow-md scale-102"
                          : "bg-slate-900/60 border-slate-800 text-slate-400"
                      }`}
                    >
                      <span className="text-[10px] font-rajdhani font-bold tracking-wider uppercase">
                        {galaxy} {isCurrent && "★ (HERE)"}
                      </span>
                      <span className="font-orbitron font-black text-sm mt-0.5 text-white">
                        {val}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Dice Formula Evaluation */}
            {activeCard.evaluateDiceFormula && (
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-400/40 my-3 text-center">
                <span className="text-[10px] font-rajdhani font-bold text-cyan-400 block uppercase tracking-wider mb-1">
                  1d15 Dice Resolution (Last Roll: {lastDiceRoll})
                </span>
                <span className="font-rajdhani text-sm sm:text-base font-bold text-slate-100">
                  {activeCard.evaluateDiceFormula(lastDiceRoll).text}
                </span>
              </div>
            )}

            {/* Static Rules or Result Text */}
            {activeCard.rules && !activeCard.evaluateDiceFormula && (
              <div className="space-y-1.5 my-3">
                {activeCard.rules.map((rule, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-300">
                    {rule}
                  </div>
                ))}
              </div>
            )}

            {activeCard.resultText && (
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-center text-slate-200 font-medium my-3">
                {activeCard.resultText}
              </div>
            )}

            {/* Bottom Action Button */}
            <button
              onClick={() => setActiveCard(null)}
              className={`w-full py-2.5 mt-2 rounded-xl font-orbitron font-bold text-xs uppercase tracking-wider transition ${
                activeCard.deck === "YELLOW"
                  ? "bg-amber-500 hover:bg-amber-400 text-black shadow-yellow-glow"
                  : "bg-emerald-500 hover:bg-emerald-400 text-black shadow-green-glow"
              }`}
            >
              Confirm & Return to Match
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Layers, Sparkles, X, AlertTriangle, ShieldCheck } from "lucide-react";
import { YELLOW_STAR_CARDS, GREEN_STAR_CARDS, StarCard } from "@/lib/data/star-cards";
import { cosmicAudio } from "@/lib/audio/cosmic-sfx";

interface AuthenticStarDecksProps {
  activeGalaxy: "ANDROMEDA" | "CENTAURUS" | "LYNX" | "MILKY WAY";
  lastDiceRoll: number;
}

export default function AuthenticStarDecks({ activeGalaxy, lastDiceRoll }: AuthenticStarDecksProps) {
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
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#18263e] to-[#0d1624] border-2 border-[#c89b3c]/50 p-4 sm:p-5 flex flex-col gap-3 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#e2b04a]" />
          <span className="font-orbitron font-extrabold text-xs text-slate-100 tracking-wider">
            DIGITAL STARCARDS DECKS (48 CARDS)
          </span>
        </div>
        <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
          OFFICIAL CANVA ARTWORK
        </span>
      </div>

      {/* Dual Deck Draw Cards (Physical Deck Styling) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Yellow Star Deck Button */}
        <button
          onClick={drawYellowCard}
          className="group relative p-4 rounded-xl border-2 border-[#d4af37] bg-gradient-to-b from-[#3d2b07] via-[#241a05] to-[#120d02] shadow-[0_6px_20px_rgba(212,175,55,0.25)] hover:border-[#ffd026] hover:scale-[1.02] active:scale-[0.98] transition-all text-left flex flex-col justify-between min-h-[100px] cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-orbitron font-extrabold bg-[#ffd026]/20 text-[#ffd026] border border-[#ffd026]/40">
              DECK: {yellowRemaining.length} / 24
            </span>
            <AlertTriangle className="w-4 h-4 text-[#ffd026] group-hover:rotate-12 transition-transform" />
          </div>
          <div className="mt-2">
            <span className="font-orbitron font-black text-sm text-[#ffd026] block drop-shadow-sm">
              DRAW YELLOW CARD
            </span>
            <span className="text-[11px] font-rajdhani text-amber-200/80 font-medium">
              Fines, Taxes, Warp, Fines & Dividends
            </span>
          </div>
        </button>

        {/* Green Star Deck Button */}
        <button
          onClick={drawGreenCard}
          className="group relative p-4 rounded-xl border-2 border-[#2d6a4f] bg-gradient-to-b from-[#0a2f1f] via-[#051c13] to-[#020e0a] shadow-[0_6px_20px_rgba(45,106,79,0.25)] hover:border-[#52b788] hover:scale-[1.02] active:scale-[0.98] transition-all text-left flex flex-col justify-between min-h-[100px] cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-orbitron font-extrabold bg-[#52b788]/20 text-[#74c69d] border border-[#52b788]/40">
              DECK: {greenRemaining.length} / 24
            </span>
            <Sparkles className="w-4 h-4 text-[#74c69d] group-hover:scale-125 transition-transform" />
          </div>
          <div className="mt-2">
            <span className="font-orbitron font-black text-sm text-[#74c69d] block drop-shadow-sm">
              DRAW GREEN CARD
            </span>
            <span className="text-[11px] font-rajdhani text-emerald-200/80 font-medium">
              Telecom, Upgrades, Booms & Free Passes
            </span>
          </div>
        </button>
      </div>

      {/* Card Display Modal (Matching Canva Physical Printed Card Artwork) */}
      {activeCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div
            className={`w-full max-w-md rounded-2xl p-6 relative shadow-2xl border-4 transition-all ${
              activeCard.deck === "YELLOW"
                ? "bg-[#faf5ea] text-[#1a1405] border-[#c89b3c]"
                : "bg-[#eaf5ec] text-[#051c13] border-[#2d6a4f]"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveCard(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-slate-800 transition"
              aria-label="Close Card"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Badge */}
            <div className="text-center mb-3">
              <span
                className={`text-[10px] font-orbitron font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                  activeCard.deck === "YELLOW"
                    ? "bg-[#c89b3c]/20 text-[#8c6518] border border-[#c89b3c]/40"
                    : "bg-[#2d6a4f]/20 text-[#19593b] border border-[#2d6a4f]/40"
                }`}
              >
                {activeCard.deck} STAR CARD #{String(activeCard.id).padStart(2, "0")}
              </span>
              <h2
                className={`font-orbitron text-xl sm:text-2xl font-black tracking-wide mt-2 ${
                  activeCard.deck === "YELLOW" ? "text-[#7a5712]" : "text-[#144d34]"
                }`}
              >
                {activeCard.title}
              </h2>
            </div>

            {/* Instruction Text */}
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed text-center mb-4 font-semibold px-2">
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
                      className={`p-2.5 rounded-xl border-2 flex flex-col items-center text-center transition ${
                        isCurrent
                          ? activeCard.deck === "YELLOW"
                            ? "bg-[#fcefc7] border-[#c89b3c] shadow-sm scale-102"
                            : "bg-[#cce3d2] border-[#2d6a4f] shadow-sm scale-102"
                          : "bg-white/80 border-slate-300 text-slate-600"
                      }`}
                    >
                      <span className="text-[10px] font-rajdhani font-black tracking-wider uppercase">
                        {galaxy} {isCurrent && "★ (CURRENT)"}
                      </span>
                      <span
                        className={`font-orbitron font-black text-sm mt-0.5 ${
                          isCurrent ? "text-black" : "text-slate-700"
                        }`}
                      >
                        {val}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* 1d15 Dice Formula Evaluation (Only shown when this card actually requires dice math!) */}
            {activeCard.evaluateDiceFormula && (
              <div className="p-3.5 rounded-xl bg-white border-2 border-[#c89b3c] my-3 text-center shadow-sm">
                <span className="text-[10px] font-rajdhani font-black text-[#8c6518] block uppercase tracking-wider mb-1">
                  1d15 Dice Resolution (Current Roll: {lastDiceRoll})
                </span>
                <span className="font-rajdhani text-sm sm:text-base font-extrabold text-black">
                  {activeCard.evaluateDiceFormula(lastDiceRoll).text}
                </span>
              </div>
            )}

            {/* Rules or Result */}
            {activeCard.rules && !activeCard.evaluateDiceFormula && (
              <div className="space-y-1.5 my-3">
                {activeCard.rules.map((rule, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-white/80 border border-slate-300 text-xs font-semibold text-slate-800">
                    {rule}
                  </div>
                ))}
              </div>
            )}

            {activeCard.resultText && (
              <div className="p-3 rounded-xl bg-white/90 border border-slate-300 text-xs sm:text-sm text-center text-slate-800 font-bold my-3">
                {activeCard.resultText}
              </div>
            )}

            {/* Confirm Button */}
            <button
              onClick={() => setActiveCard(null)}
              className={`w-full py-2.5 mt-2 rounded-xl font-orbitron font-black text-xs uppercase tracking-wider text-black shadow-md transition ${
                activeCard.deck === "YELLOW"
                  ? "bg-gradient-to-r from-[#d4af37] to-[#e6b957] hover:from-[#c89b3c] hover:to-[#d6a947]"
                  : "bg-gradient-to-r from-[#52b788] to-[#74c69d] hover:from-[#40916c] hover:to-[#52b788]"
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

"use client";

import React, { useState } from "react";
import { Layers, Sparkles, X, AlertTriangle } from "lucide-react";
import { YELLOW_STAR_CARDS, GREEN_STAR_CARDS, StarCard } from "@/lib/data/star-cards";
import { cosmicAudio } from "@/lib/audio/cosmic-sfx";

interface AuthenticStarDecksProps {
  activeGalaxy: "ANDROMEDA" | "CENTAURUS" | "LYNX" | "MILKY WAY";
  lastDiceRoll: number;
}

export default function AuthenticStarDecks({ activeGalaxy, lastDiceRoll }: AuthenticStarDecksProps) {
  const [yellowRemaining, setYellowRemaining] = useState<number[]>(() =>
    Array.from({ length: YELLOW_STAR_CARDS.length }, (_, i) => i).sort(() => Math.random() - 0.5)
  );
  const [greenRemaining, setGreenRemaining] = useState<number[]>(() =>
    Array.from({ length: GREEN_STAR_CARDS.length }, (_, i) => i).sort(() => Math.random() - 0.5)
  );

  const [activeCard, setActiveCard] = useState<StarCard | null>(null);

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
    <div className="w-full tabletop-card p-4 sm:p-5 flex flex-col gap-3 border-2 border-[#D4AF37]/70 shadow-parchment-card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#8C6518]" />
          <span className="font-orbitron font-extrabold text-xs text-ink-navy tracking-wider">
            DIGITAL STARCARDS DECKS (48 CARDS)
          </span>
        </div>
        <span className="text-[10px] font-rajdhani font-black px-2 py-0.5 rounded-full gold-badge">
          PHYSICAL CANVA ARTWORK
        </span>
      </div>

      {/* Dual Deck Draw Cards (Physical Tabletop Card Stacks) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Yellow Star Deck Button */}
        <button
          onClick={drawYellowCard}
          className="group relative p-4 rounded-xl border-2 border-[#D4AF37] bg-gradient-to-br from-[#FFF9EE] via-[#FDF3DE] to-[#F7E5BD] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-left flex flex-col justify-between min-h-[100px] cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-orbitron font-black bg-[#C89B3C]/20 text-[#7A5712] border border-[#C89B3C]/40">
              DECK: {yellowRemaining.length} / 24
            </span>
            <AlertTriangle className="w-4 h-4 text-[#8C6518] group-hover:rotate-12 transition-transform" />
          </div>
          <div className="mt-2">
            <span className="font-orbitron font-black text-sm text-[#7A5712] block">
              DRAW YELLOW CARD
            </span>
            <span className="text-[11px] font-rajdhani text-slate-700 font-semibold">
              Fines, Taxes, Warps & Star Rewards
            </span>
          </div>
        </button>

        {/* Green Star Deck Button */}
        <button
          onClick={drawGreenCard}
          className="group relative p-4 rounded-xl border-2 border-[#2D6A4F] bg-gradient-to-br from-[#F4FAF6] via-[#E8F5EC] to-[#D5EFE0] shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-left flex flex-col justify-between min-h-[100px] cursor-pointer"
        >
          <div className="flex items-center justify-between w-full">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-orbitron font-black bg-[#2D6A4F]/20 text-[#19593B] border border-[#2D6A4F]/40">
              DECK: {greenRemaining.length} / 24
            </span>
            <Sparkles className="w-4 h-4 text-[#1E6B47] group-hover:scale-125 transition-transform" />
          </div>
          <div className="mt-2">
            <span className="font-orbitron font-black text-sm text-[#19593B] block">
              DRAW GREEN CARD
            </span>
            <span className="text-[11px] font-rajdhani text-slate-700 font-semibold">
              Telecom, Upgrades, Booms & Free Passes
            </span>
          </div>
        </button>
      </div>

      {/* Card Display Modal (Matching Canva Physical Printed Card Artwork) */}
      {activeCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-md rounded-2xl p-6 relative shadow-2xl border-4 transition-all ${
              activeCard.deck === "YELLOW"
                ? "bg-[#FAF5EA] text-[#1A1405] border-[#C89B3C]"
                : "bg-[#EAF5EC] text-[#051C13] border-[#2D6A4F]"
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
                    ? "bg-[#C89B3C]/20 text-[#8C6518] border border-[#C89B3C]/40"
                    : "bg-[#2D6A4F]/20 text-[#19593B] border border-[#2D6A4F]/40"
                }`}
              >
                {activeCard.deck} STAR CARD #{String(activeCard.id).padStart(2, "0")}
              </span>
              <h2
                className={`font-orbitron text-xl sm:text-2xl font-black tracking-wide mt-2 ${
                  activeCard.deck === "YELLOW" ? "text-[#7A5712]" : "text-[#144D34]"
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
                            ? "bg-[#FCEFC7] border-[#C89B3C] shadow-sm scale-102"
                            : "bg-[#CCE3D2] border-[#2D6A4F] shadow-sm scale-102"
                          : "bg-white/80 border-slate-300 text-slate-600"
                      }`}
                    >
                      <span className="text-[10px] font-rajdhani font-black tracking-wider uppercase">
                        {galaxy} {isCurrent && "★ (CURRENT)"}
                      </span>
                      <span
                        className={`font-orbitron font-black text-sm mt-0.5 ${
                          isCurrent ? "text-black font-black" : "text-slate-700"
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
              <div className="p-3.5 rounded-xl bg-white border-2 border-[#C89B3C] my-3 text-center shadow-sm">
                <span className="text-[10px] font-rajdhani font-black text-[#8C6518] block uppercase tracking-wider mb-1">
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
                  ? "bg-gradient-to-r from-[#D4AF37] to-[#E6B957] hover:from-[#C89B3C] hover:to-[#D6A947]"
                  : "bg-gradient-to-r from-[#52B788] to-[#74C69D] hover:from-[#40916C] hover:to-[#52B788]"
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

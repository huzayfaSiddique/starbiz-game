"use client";

import React, { useState } from "react";
import { TrendingUp, Sparkles, Flame } from "lucide-react";
import { SITE_CARDS, SiteCard, GALAXY_THEMES } from "@/lib/data/site-cards";
import { cosmicAudio } from "@/lib/audio/cosmic-sfx";

interface TableAppreciationMatrixProps {
  onOpenSiteCards: () => void;
}

export default function TableAppreciationMatrix({ onOpenSiteCards }: TableAppreciationMatrixProps) {
  const [appreciationDrawCount, setAppreciationDrawCount] = useState<number>(2); // 2 sample starter boomed draws
  const [appreciatedPropertyIds, setAppreciatedPropertyIds] = useState<number[]>([4, 15]); // Arrakis (4) & Mira (15)

  const triggerBoom = () => {
    if (appreciationDrawCount >= 5) {
      alert("Maximum of 5 Market Appreciation Draws have already occurred this match!");
      return;
    }

    cosmicAudio.playStructuralBoom();

    const unappreciated = SITE_CARDS.filter((c) => !appreciatedPropertyIds.includes(c.id));
    if (unappreciated.length < 2) return;

    const shuffled = [...unappreciated].sort(() => Math.random() - 0.5);
    const picked = [shuffled[0].id, shuffled[1].id];

    setAppreciatedPropertyIds((prev) => [...prev, ...picked]);
    setAppreciationDrawCount((prev) => prev + 1);
  };

  const boomedProperties: SiteCard[] = SITE_CARDS.filter((c) =>
    appreciatedPropertyIds.includes(c.id)
  );

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-[#241a06] to-[#120e02] border-2 border-[#c89b3c]/60 p-4 sm:p-5 flex flex-col gap-3 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#ffd026]" />
          <span className="font-orbitron font-extrabold text-xs text-amber-200 tracking-wider">
            MARKET APPRECIATION MATRIX
          </span>
        </div>
        <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded-full bg-slate-900 text-[#ffd026] border border-[#c89b3c]/40">
          DRAWS: {appreciationDrawCount} / 5 LIMIT
        </span>
      </div>

      {/* Trigger Button */}
      <button
        onClick={triggerBoom}
        disabled={appreciationDrawCount >= 5}
        className={`w-full py-3 px-4 rounded-xl font-orbitron font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 select-none shadow-md cursor-pointer ${
          appreciationDrawCount >= 5
            ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
            : "bg-gradient-to-r from-[#d4af37] via-[#ffd026] to-[#d4af37] text-black border-2 border-yellow-300 hover:brightness-110 active:scale-98"
        }`}
      >
        <Flame className="w-4 h-4 text-black animate-pulse" />
        <span>
          {appreciationDrawCount >= 5
            ? "MAX 5 BOOMS REACHED (10 STARS BOOMED)"
            : "TRIGGER STRUCTURAL BOOM (+25% TO 2 STARS)"}
        </span>
      </button>

      {/* Active Boomed Properties HUD */}
      <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-rajdhani font-black text-[#ffd026] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#ffd026]" />
            Active Booms ({boomedProperties.length} Properties Elevated)
          </span>
          <button
            onClick={onOpenSiteCards}
            className="text-[10px] font-rajdhani font-bold text-amber-300 hover:underline"
          >
            Inspect Leases ➔
          </button>
        </div>

        {boomedProperties.length === 0 ? (
          <div className="text-center py-2 text-xs text-slate-400 font-rajdhani">
            No star systems currently appreciated.
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {boomedProperties.map((prop) => {
              const theme = GALAXY_THEMES[prop.galaxy];
              return (
                <div
                  key={prop.id}
                  className="px-2.5 py-1 rounded-lg border flex items-center gap-1.5 text-xs font-rajdhani font-bold bg-[#0d1624] border-[#c89b3c]/50 text-slate-100 shadow-sm"
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span>
                    #{prop.id} {prop.name}
                  </span>
                  <span className="text-[10px] text-[#ffd026] font-orbitron font-black">
                    +25%
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

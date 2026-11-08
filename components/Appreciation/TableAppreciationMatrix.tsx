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
    <div className="w-full tabletop-card p-4 sm:p-5 flex flex-col gap-3 border-2 border-[#D4AF37]/70 shadow-parchment-card">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#8C6518]" />
          <span className="font-orbitron font-extrabold text-xs text-ink-navy tracking-wider">
            MARKET APPRECIATION MATRIX
          </span>
        </div>
        <span className="text-[10px] font-rajdhani font-black px-2 py-0.5 rounded-full gold-badge">
          DRAWS: {appreciationDrawCount} / 5 LIMIT
        </span>
      </div>

      {/* Trigger Button */}
      <button
        onClick={triggerBoom}
        disabled={appreciationDrawCount >= 5}
        className={`w-full py-3 px-4 rounded-xl font-orbitron font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 select-none shadow-md cursor-pointer ${
          appreciationDrawCount >= 5
            ? "bg-[#FAF5EA] text-slate-400 border border-[#E2D5C3] cursor-not-allowed"
            : "gold-button cursor-pointer"
        }`}
      >
        <Flame className="w-4 h-4 text-ink-navy animate-pulse" />
        <span>
          {appreciationDrawCount >= 5
            ? "MAX 5 BOOMS REACHED (10 STARS BOOMED)"
            : "TRIGGER STRUCTURAL BOOM (+25% TO 2 STARS)"}
        </span>
      </button>

      {/* Active Boomed Properties HUD */}
      <div className="p-3.5 rounded-xl bg-[#FAF5EA] border border-[#E2D5C3]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-rajdhani font-black text-[#7A5712] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#8C6518]" />
            Active Booms ({boomedProperties.length} Properties Elevated)
          </span>
          <button
            onClick={onOpenSiteCards}
            className="text-[11px] font-rajdhani font-black text-[#8C6518] hover:text-ink-navy underline cursor-pointer"
          >
            Inspect Leases ➔
          </button>
        </div>

        {boomedProperties.length === 0 ? (
          <div className="text-center py-2 text-xs text-slate-500 font-rajdhani">
            No star systems currently appreciated.
          </div>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {boomedProperties.map((prop) => {
              const theme = GALAXY_THEMES[prop.galaxy];
              return (
                <div
                  key={prop.id}
                  className="px-2.5 py-1 rounded-lg border flex items-center gap-1.5 text-xs font-rajdhani font-bold bg-white border-[#E2D5C3] text-ink-navy shadow-sm"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span>
                    #{prop.id} {prop.name}
                  </span>
                  <span className="text-[10px] text-[#8C6518] font-orbitron font-black bg-[#FFF6E0] px-1 rounded border border-[#D4AF37]/40">
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

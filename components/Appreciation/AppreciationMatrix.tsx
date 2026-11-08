"use client";

import React, { useState } from "react";
import { TrendingUp, Sparkles, Building2, Flame } from "lucide-react";
import { SITE_CARDS, SiteCard, GALAXY_THEMES } from "@/lib/data/site-cards";
import { cosmicAudio } from "@/lib/audio/cosmic-sfx";

interface AppreciationMatrixProps {
  onOpenSiteCardsModal?: (galaxy?: string) => void;
}

export default function AppreciationMatrix({ onOpenSiteCardsModal }: AppreciationMatrixProps) {
  // Up to 5 appreciation draws per game, 2 properties per draw (max 10 boomed properties)
  const [appreciationDrawCount, setAppreciationDrawCount] = useState<number>(2); // Sample 2 active draws
  const [appreciatedPropertyIds, setAppreciatedPropertyIds] = useState<number[]>([4, 15]); // Arrakis (4) & Mira (15)

  // Trigger Structural Boom
  const triggerBoom = () => {
    if (appreciationDrawCount >= 5) {
      alert("Maximum of 5 Market Appreciation Draws have already occurred this match!");
      return;
    }

    cosmicAudio.playStructuralBoom();

    // Find remaining unappreciated properties
    const unappreciated = SITE_CARDS.filter((c) => !appreciatedPropertyIds.includes(c.id));
    if (unappreciated.length < 2) return;

    // Shuffle and pick 2
    const shuffled = [...unappreciated].sort(() => Math.random() - 0.5);
    const picked = [shuffled[0].id, shuffled[1].id];

    setAppreciatedPropertyIds((prev) => [...prev, ...picked]);
    setAppreciationDrawCount((prev) => prev + 1);
  };

  const boomedProperties: SiteCard[] = SITE_CARDS.filter((c) =>
    appreciatedPropertyIds.includes(c.id)
  );

  return (
    <div className="glass-panel-gold p-4 sm:p-5 rounded-2xl flex flex-col gap-3 border border-amber-500/40">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-amber-400" />
          <span className="font-orbitron font-extrabold text-xs text-amber-200 tracking-wider">
            MARKET APPRECIATION MATRIX
          </span>
        </div>
        <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-400/40">
          DRAWS: {appreciationDrawCount} / 5 LIMIT
        </span>
      </div>

      {/* Structural Boom Trigger Button */}
      <button
        onClick={triggerBoom}
        disabled={appreciationDrawCount >= 5}
        className={`w-full py-3 px-4 rounded-xl font-orbitron font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 select-none shadow-yellow-glow cursor-pointer ${
          appreciationDrawCount >= 5
            ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed"
            : "bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-400 text-black border border-yellow-300 hover:scale-[1.01]"
        }`}
      >
        <Flame className="w-4 h-4 text-black animate-pulse" />
        <span>
          {appreciationDrawCount >= 5
            ? "MAX 5 APPRECIATION DRAWS REACHED"
            : "TRIGGER STRUCTURAL BOOM (+25% TO 2 STARS)"}
        </span>
      </button>

      {/* Active Boomed Properties HUD */}
      <div className="p-3 rounded-xl bg-black/60 border border-amber-500/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-rajdhani font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Active Booms ({boomedProperties.length} Properties Elevated)
          </span>
          <span className="text-[10px] font-rajdhani text-slate-400">
            +25% Base & Upgrades
          </span>
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
                  className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 text-xs font-rajdhani font-bold bg-[#0d1222] ${theme.border} text-slate-100 shadow-sm`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: theme.color }}
                  />
                  <span>
                    #{prop.id} {prop.name}
                  </span>
                  <span className="text-[10px] text-amber-300 font-orbitron font-extrabold">
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

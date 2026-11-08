"use client";

import React, { useState } from "react";
import { Building2, X, Star, Radio, ShieldCheck, ChevronRight } from "lucide-react";
import { SITE_CARDS, SiteCard, GALAXY_THEMES } from "@/lib/data/site-cards";
import { TELECOM_CARDS } from "@/lib/data/telecom-cards";

interface SiteCardsBrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGalaxy?: "ANDROMEDA" | "CENTAURUS" | "LYNX" | "MILKY WAY";
}

export default function SiteCardsBrowserModal({
  isOpen,
  onClose,
  initialGalaxy = "ANDROMEDA",
}: SiteCardsBrowserModalProps) {
  const [selectedGalaxy, setSelectedGalaxy] = useState<
    "ANDROMEDA" | "CENTAURUS" | "LYNX" | "MILKY WAY"
  >(initialGalaxy);
  const [activeTab, setActiveTab] = useState<"STARS" | "TELECOM">("STARS");

  if (!isOpen) return null;

  const galaxyProperties = SITE_CARDS.filter((c) => c.galaxy === selectedGalaxy);
  const galaxyTelecom = TELECOM_CARDS.find((t) => t.galaxy === selectedGalaxy);
  const theme = GALAXY_THEMES[selectedGalaxy];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[92vh] rounded-3xl bg-[#070b1a] border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-400/30 text-cyan-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-orbitron text-lg sm:text-xl font-black text-white tracking-wide">
                24 STAR SITES & TELECOM REPOSITORIES
              </h2>
              <span className="text-xs font-rajdhani text-slate-400">
                Official Real-Estate Costs, Appreciated Rents (+25%) & 5-Tier Commercial Schedules
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            aria-label="Close Site Browser"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Galaxy Selector Bar */}
        <div className="px-4 py-2.5 bg-slate-950/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
          {/* 4 Galaxies Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {(["ANDROMEDA", "CENTAURUS", "LYNX", "MILKY WAY"] as const).map((gal) => {
              const galTheme = GALAXY_THEMES[gal];
              const isSelected = selectedGalaxy === gal;
              return (
                <button
                  key={gal}
                  onClick={() => setSelectedGalaxy(gal)}
                  className={`px-3 py-1.5 rounded-xl font-orbitron font-extrabold text-xs tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? `border-2 text-white shadow-lg`
                      : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                  style={{
                    backgroundColor: isSelected ? `${galTheme.color}25` : undefined,
                    borderColor: isSelected ? galTheme.color : undefined,
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: galTheme.color }}
                  />
                  <span>{gal}</span>
                </button>
              );
            })}
          </div>

          {/* Sub Tab: Stars vs Telecom */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-rajdhani font-bold">
            <button
              onClick={() => setActiveTab("STARS")}
              className={`px-3 py-1 rounded-lg transition ${
                activeTab === "STARS"
                  ? "bg-cyan-500 text-black font-extrabold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              6 Star Systems
            </button>
            <button
              onClick={() => setActiveTab("TELECOM")}
              className={`px-3 py-1 rounded-lg transition ${
                activeTab === "TELECOM"
                  ? "bg-cyan-500 text-black font-extrabold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Telecom Service
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {activeTab === "STARS" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galaxyProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="rounded-2xl p-4 bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between shadow-lg"
                >
                  {/* Card Title & Galaxy */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-orbitron font-extrabold text-slate-400">
                        SPACE #{prop.id}
                      </span>
                      <span
                        className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${theme.color}20`,
                          color: theme.color,
                        }}
                      >
                        {prop.galaxy}
                      </span>
                    </div>

                    <h3 className="font-orbitron font-black text-lg text-white tracking-wide">
                      {prop.name}
                    </h3>

                    {/* Cost & Base Rent */}
                    <div className="grid grid-cols-2 gap-2 my-2.5 p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-rajdhani">
                          Base Cost:
                        </span>
                        <span className="font-orbitron font-black text-cyan-300">
                          {prop.cost} ★
                        </span>
                        <span className="text-[10px] text-amber-400 block font-rajdhani mt-0.5">
                          Appr: {prop.appCost} ★ (+25%)
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block font-rajdhani">
                          Raw Rent:
                        </span>
                        <span className="font-orbitron font-black text-cyan-300">
                          {prop.lease} ★
                        </span>
                        <span className="text-[10px] text-amber-400 block font-rajdhani mt-0.5">
                          Appr: {prop.appLease} ★ (+25%)
                        </span>
                      </div>
                    </div>

                    {/* 5 Upgrade Levels Table */}
                    <div className="mt-2 text-[11px] font-rajdhani">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Commercial Upgrades (Normal / Appreciated)
                      </span>
                      <div className="space-y-1">
                        <div className="flex justify-between py-0.5 border-b border-slate-800/80">
                          <span className="text-slate-300">1. Shop</span>
                          <span className="text-white font-bold">
                            {prop.upgrades.shop[0]} ★ /{" "}
                            <span className="text-amber-300">{prop.upgrades.shop[1]} ★</span>
                          </span>
                        </div>
                        <div className="flex justify-between py-0.5 border-b border-slate-800/80">
                          <span className="text-slate-300">2. Restaurant</span>
                          <span className="text-white font-bold">
                            {prop.upgrades.restaurant[0]} ★ /{" "}
                            <span className="text-amber-300">{prop.upgrades.restaurant[1]} ★</span>
                          </span>
                        </div>
                        <div className="flex justify-between py-0.5 border-b border-slate-800/80">
                          <span className="text-slate-300">3. Cinema</span>
                          <span className="text-white font-bold">
                            {prop.upgrades.cinema[0]} ★ /{" "}
                            <span className="text-amber-300">{prop.upgrades.cinema[1]} ★</span>
                          </span>
                        </div>
                        <div className="flex justify-between py-0.5 border-b border-slate-800/80">
                          <span className="text-slate-300">4. Hypermarket</span>
                          <span className="text-white font-bold">
                            {prop.upgrades.hypermart[0]} ★ /{" "}
                            <span className="text-amber-300">{prop.upgrades.hypermart[1]} ★</span>
                          </span>
                        </div>
                        <div className="flex justify-between py-0.5">
                          <span className="text-slate-300">5. Mall</span>
                          <span className="text-white font-bold">
                            {prop.upgrades.mall[0]} ★ /{" "}
                            <span className="text-amber-300">{prop.upgrades.mall[1]} ★</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Telecom Card Detail */
            <div className="max-w-md mx-auto p-6 rounded-3xl bg-slate-950/90 border border-slate-800 text-center shadow-xl">
              <Radio className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
              <span className="text-xs font-orbitron font-extrabold text-cyan-400 uppercase tracking-widest">
                TELECOM INFRASTRUCTURE
              </span>
              <h3 className="font-orbitron font-black text-xl text-white mt-1">
                {galaxyTelecom?.name}
              </h3>

              <div className="grid grid-cols-2 gap-3 my-5 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div>
                  <span className="text-xs text-slate-400 block font-rajdhani">
                    Purchase Price
                  </span>
                  <span className="font-orbitron font-black text-xl text-cyan-300">
                    {galaxyTelecom?.cost} ★
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-rajdhani">
                    Usage Lease
                  </span>
                  <span className="font-orbitron font-black text-xl text-amber-300">
                    {galaxyTelecom?.lease} ★
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-rajdhani leading-relaxed">
                When an opponent lands on this Telecom space, they must pay the owner the usage fee.
                Telecom values rise clockwise around the board from Andromeda (75★) to Milky Way (300★).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

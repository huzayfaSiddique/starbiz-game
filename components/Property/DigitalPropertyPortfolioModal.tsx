"use client";

import React, { useState } from "react";
import { Building2, X, Star, ChevronRight, ShieldCheck, DollarSign, ArrowUpCircle } from "lucide-react";
import { SITE_CARDS, SiteCard, GALAXY_THEMES } from "@/lib/data/site-cards";
import { PlayerState } from "@/lib/data/game-state";

interface DigitalPropertyPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePlayer: PlayerState;
  allPlayers: PlayerState[];
  propertyOwners: Record<number, string>; // propertyId -> playerId
  propertyTiers: Record<number, number>; // propertyId -> 0..5
  onBuyProperty: (propertyId: number, cost: number) => void;
  onUpgradeProperty: (propertyId: number, upgradeCost: number) => void;
  onTransferRent: (fromPlayerId: string, toPlayerId: string, rentAmount: number) => void;
}

export default function DigitalPropertyPortfolioModal({
  isOpen,
  onClose,
  activePlayer,
  allPlayers,
  propertyOwners,
  propertyTiers,
  onBuyProperty,
  onUpgradeProperty,
  onTransferRent,
}: DigitalPropertyPortfolioModalProps) {
  const [selectedGalaxy, setSelectedGalaxy] = useState<
    "ANDROMEDA" | "CENTAURUS" | "LYNX" | "MILKY WAY"
  >("ANDROMEDA");

  if (!isOpen) return null;

  const galaxyProperties = SITE_CARDS.filter((c) => c.galaxy === selectedGalaxy);
  const theme = GALAXY_THEMES[selectedGalaxy];

  const tierNames = ["Raw Site", "Shop", "Restaurant", "Cinema", "Hypermarket", "Mall"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-ink-navy/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-5xl max-h-[92vh] rounded-3xl bg-[#FAF5EA] border-2 border-[#D4AF37] shadow-2xl flex flex-col overflow-hidden text-ink-navy">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E2D5C3] flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#FFF6E0] border border-[#D4AF37] text-[#8C6518]">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-orbitron text-lg sm:text-xl font-black text-ink-navy">
                DIGITAL REAL-ESTATE REPOSITORY
              </h2>
              <span className="text-xs font-rajdhani font-semibold text-slate-600">
                24 Physical Board Spaces • Upgrades & Opponent Rent Transfers (No Paper Cards Needed)
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#FAF5EA] hover:bg-[#E2D5C3] text-ink-navy transition cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Galaxy Selector Strip */}
        <div className="px-4 py-2.5 bg-[#F5ECE0] border-b border-[#E2D5C3] flex flex-wrap items-center gap-2">
          {(["ANDROMEDA", "CENTAURUS", "LYNX", "MILKY WAY"] as const).map((gal) => {
            const galTheme = GALAXY_THEMES[gal];
            const isSelected = selectedGalaxy === gal;
            return (
              <button
                key={gal}
                onClick={() => setSelectedGalaxy(gal)}
                className={`px-3 py-1.5 rounded-xl font-orbitron font-extrabold text-xs tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-white border-2 text-ink-navy shadow-sm"
                    : "bg-transparent border border-transparent text-slate-600 hover:text-ink-navy hover:bg-white/50"
                }`}
                style={{
                  borderColor: isSelected ? galTheme.color : "transparent",
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

        {/* Property Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-parchment-bg-texture">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galaxyProperties.map((prop) => {
              const ownerId = propertyOwners[prop.id];
              const owner = allPlayers.find((p) => p.id === ownerId);
              const isOwnedByActive = ownerId === activePlayer.id;
              const isUnowned = !ownerId;
              const currentTier = propertyTiers[prop.id] || 0;

              // Calculate current rent based on tier
              let currentRent = prop.lease;
              if (currentTier === 1) currentRent = prop.upgrades.shop[0];
              else if (currentTier === 2) currentRent = prop.upgrades.restaurant[0];
              else if (currentTier === 3) currentRent = prop.upgrades.cinema[0];
              else if (currentTier === 4) currentRent = prop.upgrades.hypermart[0];
              else if (currentTier === 5) currentRent = prop.upgrades.mall[0];

              const upgradeCost = Math.round(prop.cost * 0.7);

              return (
                <div
                  key={prop.id}
                  className="rounded-2xl p-4 bg-white border-2 border-[#E2D5C3] hover:border-[#D4AF37] transition flex flex-col justify-between shadow-sm"
                >
                  <div>
                    {/* Top Tag & Ownership */}
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-orbitron font-extrabold text-[#7A5712]">
                        SPACE #{prop.id}
                      </span>
                      {owner ? (
                        <span
                          className="text-[10px] font-rajdhani font-black px-2 py-0.5 rounded-full flex items-center gap-1 border"
                          style={{
                            backgroundColor: `${owner.tokenColor}15`,
                            color: owner.tokenColor,
                            borderColor: owner.tokenColor,
                          }}
                        >
                          OWNER: {owner.name.split(" ")[0]}
                        </span>
                      ) : (
                        <span className="text-[10px] font-rajdhani font-black px-2 py-0.5 rounded-full bg-[#FAF5EA] text-slate-500 border border-[#E2D5C3]">
                          UNOWNED (BANK)
                        </span>
                      )}
                    </div>

                    <h3 className="font-orbitron font-black text-lg text-ink-navy">
                      {prop.name}
                    </h3>

                    {/* Price and Current Rent Box */}
                    <div className="grid grid-cols-2 gap-2 my-2.5 p-2.5 rounded-xl bg-[#FAF5EA] border border-[#E2D5C3] text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block font-rajdhani">
                          Base Cost:
                        </span>
                        <span className="font-orbitron font-black text-[#8C6518]">
                          {prop.cost} ★
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block font-rajdhani">
                          Current Rent Due:
                        </span>
                        <span className="font-orbitron font-black text-[#1E6B47]">
                          {currentRent} ★
                        </span>
                      </div>
                    </div>

                    {/* Current Upgrade Level */}
                    <div className="flex items-center justify-between text-xs font-rajdhani py-1 px-2.5 rounded-lg bg-[#FAF5EA] border border-[#E2D5C3] mb-3">
                      <span className="text-slate-500 font-bold">Upgrade Tier:</span>
                      <span className="font-black text-[#8C6518]">
                        Tier {currentTier} — {tierNames[currentTier]}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-1.5 pt-2 border-t border-[#E2D5C3]">
                    {/* If unowned: Active player can buy */}
                    {isUnowned && (
                      <button
                        onClick={() => onBuyProperty(prop.id, prop.cost)}
                        className="w-full py-2 rounded-xl gold-button font-orbitron font-black text-xs uppercase tracking-wider transition cursor-pointer"
                      >
                        Buy Site for {prop.cost} ★
                      </button>
                    )}

                    {/* If owned by active player: Upgrade */}
                    {isOwnedByActive && currentTier < 5 && (
                      <button
                        onClick={() => onUpgradeProperty(prop.id, upgradeCost)}
                        className="w-full py-2 rounded-xl bg-[#1E6B47] hover:bg-[#165034] text-white font-orbitron font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <ArrowUpCircle className="w-4 h-4 text-emerald-300" />
                        <span>Upgrade to {tierNames[currentTier + 1]} ({upgradeCost}★)</span>
                      </button>
                    )}

                    {/* If owned by someone else: Opponent landed here (Transfer Rent) */}
                    {owner && !isOwnedByActive && (
                      <button
                        onClick={() => onTransferRent(activePlayer.id, owner.id, currentRent)}
                        className="w-full py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-orbitron font-black text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <DollarSign className="w-4 h-4 text-rose-200" />
                        <span>Pay {currentRent}★ Rent to {owner.name.split(" ")[0]}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

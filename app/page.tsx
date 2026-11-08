"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Dices,
  Layers,
  Trophy,
  TrendingUp,
  Volume2,
  VolumeX,
  Building2,
  Landmark,
  Radio,
  ChevronRight,
  ShieldCheck,
  Star,
} from "lucide-react";
import ReservedAdBanner from "@/components/Ads/ReservedAdBanner";
import TycoonWalletBar from "@/components/Player/TycoonWalletBar";
import TactileDice1d15 from "@/components/Dice/TactileDice1d15";
import AuthenticStarDecks from "@/components/StarCards/AuthenticStarDecks";
import TableLotteryConsole from "@/components/Lottery/TableLotteryConsole";
import TableAppreciationMatrix from "@/components/Appreciation/TableAppreciationMatrix";
import DigitalPropertyPortfolioModal from "@/components/Property/DigitalPropertyPortfolioModal";
import BankLoansModal from "@/components/Reference/BankLoansModal";
import { INITIAL_PLAYERS, PlayerState } from "@/lib/data/game-state";
import { GALAXY_THEMES, SITE_CARDS } from "@/lib/data/site-cards";
import { cosmicAudio } from "@/lib/audio/cosmic-sfx";

export default function StarBizMainApp() {
  // Players State (Starting with 3,000 Stars each)
  const [players, setPlayers] = useState<PlayerState[]>(INITIAL_PLAYERS);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const [turnNumber, setTurnNumber] = useState<number>(1);

  // Active Galaxy
  const [activeGalaxy, setActiveGalaxy] = useState<"ANDROMEDA" | "CENTAURUS" | "LYNX" | "MILKY WAY">("ANDROMEDA");
  const galaxyTheme = GALAXY_THEMES[activeGalaxy];

  // 1d15 Dice
  const [lastDiceRoll, setLastDiceRoll] = useState<number>(12);

  // Property Ownership & Upgrades (Digital properties since no physical cards exist)
  const [propertyOwners, setPropertyOwners] = useState<Record<number, string>>({
    1: "p1", // Meissa owned by Player 1
    7: "p2", // Merak owned by Player 2
  });
  const [propertyTiers, setPropertyTiers] = useState<Record<number, number>>({
    1: 1, // Meissa upgraded to Shop
    7: 0, // Merak is Raw Site
  });

  // Modals
  const [isPropertiesOpen, setIsPropertiesOpen] = useState<boolean>(false);
  const [isLoansOpen, setIsLoansOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  const activePlayer = players[activePlayerIndex];

  // Modify Stars Wallet
  const handleModifyStars = (playerId: string, delta: number) => {
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id === playerId) {
          const newBal = Math.max(0, p.starsBalance + delta);
          return { ...p, starsBalance: newBal };
        }
        return p;
      })
    );
  };

  // Transfer Rent from Visitor to Property Owner
  const handleTransferRent = (fromPlayerId: string, toPlayerId: string, rentAmount: number) => {
    handleModifyStars(fromPlayerId, -rentAmount);
    handleModifyStars(toPlayerId, rentAmount);
    alert(`Transferred ${rentAmount}★ Rent to Property Owner!`);
  };

  // Buy Site
  const handleBuyProperty = (propertyId: number, cost: number) => {
    if (activePlayer.starsBalance < cost) {
      alert("Insufficient Stars to acquire this property!");
      return;
    }
    handleModifyStars(activePlayer.id, -cost);
    setPropertyOwners((prev) => ({ ...prev, [propertyId]: activePlayer.id }));
    setPropertyTiers((prev) => ({ ...prev, [propertyId]: 0 }));
    alert(`Congratulations! You now own Space #${propertyId}!`);
  };

  // Upgrade Site
  const handleUpgradeProperty = (propertyId: number, upgradeCost: number) => {
    if (activePlayer.starsBalance < upgradeCost) {
      alert("Insufficient Stars for this commercial upgrade!");
      return;
    }
    handleModifyStars(activePlayer.id, -upgradeCost);
    setPropertyTiers((prev) => ({
      ...prev,
      [propertyId]: Math.min(5, (prev[propertyId] || 0) + 1),
    }));
    alert(`Upgraded Space #${propertyId} to next commercial tier!`);
  };

  // Advance Turn
  const handleAdvanceTurn = () => {
    setActivePlayerIndex((prev) => (prev + 1) % players.length);
    setTurnNumber((prev) => prev + 1);
  };

  // Toggle Sound
  const toggleSound = () => {
    cosmicAudio.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="w-full min-h-screen parchment-bg-texture text-ink-navy flex flex-col justify-between selection:bg-gold-light selection:text-ink-navy">
      {/* TOP TABLE HEADER */}
      <header className="relative z-20 w-full border-b-2 border-[#E2D5C3] bg-white/90 backdrop-blur-md px-3 sm:px-6 py-2.5 shadow-sm">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Branding */}
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#D4AF37] border border-[#8C6518] shadow-sm animate-pulse" />
            <h1 className="font-orbitron font-black text-base sm:text-xl text-ink-navy tracking-wider">
              STARBIZ <span className="text-[#8C6518] text-xs font-bold sm:inline hidden">TABLETOP COMPANION</span>
            </h1>
          </div>

          {/* Galaxy Selector Strip */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#FAF5EA] border border-[#E2D5C3] text-xs font-orbitron font-bold">
            {(["ANDROMEDA", "CENTAURUS", "LYNX", "MILKY WAY"] as const).map((gal) => {
              const t = GALAXY_THEMES[gal];
              const isSelected = activeGalaxy === gal;
              return (
                <button
                  key={gal}
                  onClick={() => setActiveGalaxy(gal)}
                  className={`px-2.5 py-1 rounded-lg transition cursor-pointer text-[10px] sm:text-xs flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-white text-ink-navy shadow-sm border"
                      : "text-slate-500 hover:text-ink-navy"
                  }`}
                  style={{
                    borderColor: isSelected ? t.color : "transparent",
                  }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                  <span>{gal.slice(0, 4)}</span>
                </button>
              );
            })}
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            {/* Properties Repository Trigger */}
            <button
              onClick={() => setIsPropertiesOpen(true)}
              className="px-3 py-1.5 rounded-xl gold-badge hover:brightness-105 font-rajdhani font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
            >
              <Building2 className="w-4 h-4 text-[#8C6518]" />
              <span className="hidden sm:inline">24 Properties</span>
            </button>

            {/* Bank Loans Trigger */}
            <button
              onClick={() => setIsLoansOpen(true)}
              className="px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#FAF5EA] border border-[#E2D5C3] text-ink-navy text-xs font-rajdhani font-black flex items-center gap-1.5 transition cursor-pointer shadow-sm"
            >
              <Landmark className="w-3.5 h-3.5 text-[#1B4965]" />
              <span className="hidden sm:inline">Loans</span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className="p-1.5 rounded-xl bg-white hover:bg-[#FAF5EA] border border-[#E2D5C3] text-ink-navy transition cursor-pointer shadow-sm"
              title="Toggle Audio SFX"
              aria-label="Toggle Sound"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#8C6518]" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
        </div>
      </header>

      {/* MAIN GAME CONSOLE VIEWPORT (Centered Luxury Tabletop Console) */}
      <main className="relative z-10 flex-1 max-w-4xl w-full mx-auto p-3 sm:p-5 flex flex-col gap-4">
        {/* Top Reserved Ad Banner (Zero CLS) */}
        <ReservedAdBanner position="top" />

        {/* 1. TYCOON HUD & STAR BALANCE (THE MONEY) */}
        <TycoonWalletBar
          activePlayer={activePlayer}
          allPlayers={players}
          turnNumber={turnNumber}
          onAdvanceTurn={handleAdvanceTurn}
          onModifyStars={handleModifyStars}
          onSelectPlayer={(idx) => setActivePlayerIndex(idx)}
        />

        {/* 2. THE HERO 1d15 ELECTRONIC PROPULSION DIE */}
        <TactileDice1d15
          currentRoll={lastDiceRoll}
          onRollComplete={(val) => setLastDiceRoll(val)}
        />

        {/* 3. DIGITAL STARCARDS DECKS (YELLOW & GREEN) */}
        <AuthenticStarDecks
          activeGalaxy={activeGalaxy}
          lastDiceRoll={lastDiceRoll}
        />

        {/* 4. GALACTIC LOTTERY & MARKET APPRECIATION CONSOLES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TableLotteryConsole
            activePlayerId={activePlayer.id}
            activePlayerName={activePlayer.name}
            onModifyStars={handleModifyStars}
            onTriggerAppreciation={() => {
              alert("Lottery Draw Complete! Review Market Appreciation Matrix for boomed star systems.");
            }}
          />

          <TableAppreciationMatrix
            onOpenSiteCards={() => setIsPropertiesOpen(true)}
          />
        </div>

        {/* Bottom Property & Reference Trigger Bar */}
        <div className="tabletop-card p-3.5 border-2 border-[#D4AF37]/50 bg-white flex items-center justify-between text-xs font-rajdhani shadow-sm">
          <div className="flex items-center gap-2 text-ink-navy font-bold">
            <Building2 className="w-4 h-4 text-[#8C6518]" />
            <span>Digital Real-Estate Engine: 24 Star Sites, Upgrades & Opponent Rent Collections</span>
          </div>
          <button
            onClick={() => setIsPropertiesOpen(true)}
            className="px-3 py-1.5 rounded-xl gold-button font-orbitron font-black text-xs uppercase tracking-wider transition cursor-pointer"
          >
            Open Properties
          </button>
        </div>

        {/* Bottom Reserved Ad Banner */}
        <ReservedAdBanner position="bottom" className="mt-1" />
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 w-full border-t-2 border-[#E2D5C3] bg-[#F5ECE0] px-4 py-2.5 text-center text-xs font-rajdhani text-slate-600">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>StarBiz Official Tabletop Companion • 100% Offline PWA</span>
          <span>Handles All Dice, Cards, Upgrades & Tycoon Star Balances</span>
        </div>
      </footer>

      {/* DIGITAL PROPERTY PORTFOLIO MODAL */}
      <DigitalPropertyPortfolioModal
        isOpen={isPropertiesOpen}
        onClose={() => setIsPropertiesOpen(false)}
        activePlayer={activePlayer}
        allPlayers={players}
        propertyOwners={propertyOwners}
        propertyTiers={propertyTiers}
        onBuyProperty={handleBuyProperty}
        onUpgradeProperty={handleUpgradeProperty}
        onTransferRent={handleTransferRent}
      />

      {/* BANK LOANS MODAL */}
      <BankLoansModal
        isOpen={isLoansOpen}
        onClose={() => setIsLoansOpen(false)}
      />
    </div>
  );
}

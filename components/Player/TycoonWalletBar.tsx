"use client";

import React, { useState } from "react";
import { Star, Plus, Minus, ChevronRight, Users, Coins } from "lucide-react";
import { PlayerState } from "@/lib/data/game-state";

interface TycoonWalletBarProps {
  activePlayer: PlayerState;
  allPlayers: PlayerState[];
  turnNumber: number;
  onAdvanceTurn: () => void;
  onModifyStars: (playerId: string, delta: number) => void;
  onSelectPlayer: (index: number) => void;
}

export default function TycoonWalletBar({
  activePlayer,
  allPlayers,
  turnNumber,
  onAdvanceTurn,
  onModifyStars,
  onSelectPlayer,
}: TycoonWalletBarProps) {
  const [customAmount, setCustomAmount] = useState<string>("");
  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [customMode, setCustomMode] = useState<"ADD" | "DEDUCT">("ADD");

  const handleCustomSubmit = () => {
    const val = parseInt(customAmount, 10);
    if (!isNaN(val) && val > 0) {
      onModifyStars(activePlayer.id, customMode === "ADD" ? val : -val);
      setCustomAmount("");
      setShowCustomModal(false);
    }
  };

  return (
    <div className="w-full tabletop-card p-4 sm:p-5 flex flex-col gap-3.5 border-2 border-[#D4AF37]/70 shadow-parchment-card">
      {/* Top Row: Active Player & Turn */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2D5C3] pb-3">
        <div className="flex items-center gap-2.5">
          <span
            className="w-4 h-4 rounded-full border-2 border-white shadow-md flex items-center justify-center text-xs"
            style={{ backgroundColor: activePlayer.tokenColor }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-orbitron font-extrabold text-[#8C6518] tracking-widest uppercase">
                ACTIVE TYCOON
              </span>
              <span className="text-[10px] font-rajdhani font-bold px-2 py-0.5 rounded-full bg-[#FAF5EA] text-[#475569] border border-[#E2D5C3]">
                TURN {turnNumber}
              </span>
            </div>
            <h2 className="font-orbitron font-black text-base sm:text-lg text-ink-navy">
              {activePlayer.name}
            </h2>
          </div>
        </div>

        {/* Turn Handover Button */}
        <button
          onClick={onAdvanceTurn}
          className="px-4 py-1.5 rounded-xl gold-button font-orbitron font-black text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
        >
          <span>End Turn</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Middle Hero: Total Number of Stars (Money Balance) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF5EA] rounded-xl p-3.5 border border-[#E2D5C3]">
        <div>
          <span className="text-[10px] font-rajdhani font-extrabold text-[#7A5712] uppercase tracking-widest block">
            STAR BALANCE (LIQUID CASH)
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[#8C6518] text-2xl sm:text-3xl font-black font-orbitron leading-none flex items-center gap-1.5">
              ⭐ {activePlayer.starsBalance.toLocaleString()}
              <span className="text-sm font-extrabold text-ink-navy font-rajdhani">STARS</span>
            </span>
          </div>
        </div>

        {/* Quick Cash Adjusters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onModifyStars(activePlayer.id, 250)}
            className="px-2.5 py-1.5 rounded-lg bg-[#E6F4EA] hover:bg-[#CEEAD6] border border-[#1E6B47]/40 text-[#133C2A] font-rajdhani font-black text-xs transition"
            title="Collect 250 Stars for Passing Start Hub"
          >
            +250★ (Start)
          </button>
          <button
            onClick={() => onModifyStars(activePlayer.id, 100)}
            className="px-2 py-1.5 rounded-lg bg-white hover:bg-[#F4ECE0] border border-[#E2D5C3] text-ink-navy font-rajdhani font-bold text-xs transition"
          >
            +100★
          </button>
          <button
            onClick={() => onModifyStars(activePlayer.id, -50)}
            className="px-2 py-1.5 rounded-lg bg-white hover:bg-[#F4ECE0] border border-[#E2D5C3] text-ink-navy font-rajdhani font-bold text-xs transition"
          >
            −50★
          </button>
          <button
            onClick={() => onModifyStars(activePlayer.id, -100)}
            className="px-2 py-1.5 rounded-lg bg-white hover:bg-[#F4ECE0] border border-[#E2D5C3] text-ink-navy font-rajdhani font-bold text-xs transition"
          >
            −100★
          </button>
          <button
            onClick={() => {
              setCustomMode("ADD");
              setShowCustomModal(true);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-[#FFF6E0] hover:bg-[#F5E5BE] border border-[#D4AF37] text-[#7A5712] font-rajdhani font-bold text-xs transition"
          >
            ± Custom
          </button>
        </div>
      </div>

      {/* Table Roster Bar (Live balances across all 4 Tycoons) */}
      <div className="flex items-center gap-2 overflow-x-auto pt-1">
        <span className="text-[10px] font-rajdhani font-bold text-slate-500 shrink-0 flex items-center gap-1">
          <Users className="w-3 h-3 text-[#8C6518]" />
          Table Roster:
        </span>
        <div className="flex items-center gap-2">
          {allPlayers.map((player, idx) => {
            const isActive = player.id === activePlayer.id;
            return (
              <button
                key={player.id}
                onClick={() => onSelectPlayer(idx)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-rajdhani font-bold transition flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? "bg-[#FFF6E0] border-[#D4AF37] text-ink-navy shadow-sm font-extrabold"
                    : "bg-[#FAF5EA] border-[#E2D5C3] text-slate-600 hover:text-ink-navy"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: player.tokenColor }}
                />
                <span>P{idx + 1}:</span>
                <span className={isActive ? "text-[#8C6518] font-black" : "text-slate-700"}>
                  {player.starsBalance.toLocaleString()}★
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Transaction Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm rounded-2xl bg-white border-2 border-[#D4AF37] p-5 shadow-2xl text-center text-ink-navy">
            <h3 className="font-orbitron font-black text-base text-ink-navy mb-2">
              Adjust Star Balance: {activePlayer.name}
            </h3>

            <div className="flex justify-center gap-2 my-3">
              <button
                onClick={() => setCustomMode("ADD")}
                className={`px-3 py-1.5 rounded-lg font-rajdhani font-bold text-xs ${
                  customMode === "ADD" ? "bg-[#1E6B47] text-white" : "bg-[#FAF5EA] border border-[#E2D5C3] text-slate-700"
                }`}
              >
                + Add Stars (Reward / Rent)
              </button>
              <button
                onClick={() => setCustomMode("DEDUCT")}
                className={`px-3 py-1.5 rounded-lg font-rajdhani font-bold text-xs ${
                  customMode === "DEDUCT" ? "bg-rose-700 text-white" : "bg-[#FAF5EA] border border-[#E2D5C3] text-slate-700"
                }`}
              >
                − Deduct Stars (Fine / Payment)
              </button>
            </div>

            <input
              type="number"
              placeholder="Enter amount (e.g. 350)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-[#FAF5EA] border-2 border-[#D4AF37] text-ink-navy font-orbitron text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] my-2"
              autoFocus
            />

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => setShowCustomModal(false)}
                className="py-2 rounded-xl bg-[#FAF5EA] hover:bg-[#F4ECE0] border border-[#E2D5C3] text-slate-700 font-rajdhani font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomSubmit}
                className="py-2 rounded-xl gold-button font-orbitron font-bold text-xs uppercase"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

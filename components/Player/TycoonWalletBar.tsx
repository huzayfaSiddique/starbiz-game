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
    <div className="w-full rounded-2xl bg-gradient-to-r from-[#111e33] via-[#0d1728] to-[#111e33] border-2 border-[#c89b3c]/60 shadow-[0_8px_25px_rgba(0,0,0,0.5)] p-4 sm:p-5 flex flex-col gap-3">
      {/* Top Row: Active Player & Turn */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-700/60 pb-3">
        <div className="flex items-center gap-2.5">
          <span
            className="w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-xs"
            style={{ backgroundColor: activePlayer.tokenColor }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-orbitron font-extrabold text-[#e2b04a] tracking-wider uppercase">
                ACTIVE TYCOON
              </span>
              <span className="text-[11px] font-rajdhani font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                TURN {turnNumber}
              </span>
            </div>
            <h2 className="font-orbitron font-black text-base sm:text-lg text-white">
              {activePlayer.name}
            </h2>
          </div>
        </div>

        {/* Turn Handover Button */}
        <button
          onClick={onAdvanceTurn}
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#c89b3c] to-[#e6b957] hover:from-[#b88a2c] hover:to-[#d6a947] text-black font-orbitron font-black text-xs uppercase tracking-wider shadow-md transition flex items-center gap-1.5 cursor-pointer"
        >
          <span>End Turn</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Middle Hero: Total Number of Stars (Money Balance) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-black/40 rounded-xl p-3 border border-slate-800">
        <div>
          <span className="text-[10px] font-rajdhani font-bold text-slate-400 uppercase tracking-widest block">
            STAR BALANCE (LIQUID CASH)
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[#ffd026] text-2xl sm:text-3xl font-black font-orbitron leading-none flex items-center gap-1.5 drop-shadow-[0_2px_10px_rgba(255,208,38,0.4)]">
              ⭐ {activePlayer.starsBalance.toLocaleString()}
              <span className="text-sm font-bold text-[#e6b957] font-rajdhani">STARS</span>
            </span>
          </div>
        </div>

        {/* Quick Cash Adjusters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => onModifyStars(activePlayer.id, 250)}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-rajdhani font-bold text-xs transition"
            title="Collect 250 Stars for Passing Start Hub"
          >
            +250★ (Start)
          </button>
          <button
            onClick={() => onModifyStars(activePlayer.id, 100)}
            className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-rajdhani font-bold text-xs transition"
          >
            +100★
          </button>
          <button
            onClick={() => onModifyStars(activePlayer.id, -50)}
            className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-rajdhani font-bold text-xs transition"
          >
            −50★
          </button>
          <button
            onClick={() => onModifyStars(activePlayer.id, -100)}
            className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-rajdhani font-bold text-xs transition"
          >
            −100★
          </button>
          <button
            onClick={() => {
              setCustomMode("ADD");
              setShowCustomModal(true);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-[#c89b3c]/20 hover:bg-[#c89b3c]/30 border border-[#c89b3c]/50 text-[#e6b957] font-rajdhani font-bold text-xs transition"
          >
            ± Custom
          </button>
        </div>
      </div>

      {/* Table Roster Bar (Live balances across all 4 Tycoons) */}
      <div className="flex items-center gap-2 overflow-x-auto pt-1">
        <span className="text-[10px] font-rajdhani font-bold text-slate-400 shrink-0 flex items-center gap-1">
          <Users className="w-3 h-3 text-[#c89b3c]" />
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
                    ? "bg-[#c89b3c]/25 border-[#c89b3c] text-white shadow-sm"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: player.tokenColor }}
                />
                <span>P{idx + 1}:</span>
                <span className={isActive ? "text-[#ffd026] font-extrabold" : "text-slate-300"}>
                  {player.starsBalance.toLocaleString()}★
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Transaction Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-[#0e172a] border border-[#c89b3c] p-5 shadow-2xl text-center">
            <h3 className="font-orbitron font-black text-base text-white mb-2">
              Adjust Star Balance for {activePlayer.name}
            </h3>

            <div className="flex justify-center gap-2 my-3">
              <button
                onClick={() => setCustomMode("ADD")}
                className={`px-3 py-1.5 rounded-lg font-rajdhani font-bold text-xs ${
                  customMode === "ADD" ? "bg-emerald-500 text-black" : "bg-slate-800 text-slate-300"
                }`}
              >
                + Add Stars (Reward / Rent)
              </button>
              <button
                onClick={() => setCustomMode("DEDUCT")}
                className={`px-3 py-1.5 rounded-lg font-rajdhani font-bold text-xs ${
                  customMode === "DEDUCT" ? "bg-rose-500 text-white" : "bg-slate-800 text-slate-300"
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
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-orbitron text-center text-lg focus:outline-none focus:border-[#c89b3c] my-2"
              autoFocus
            />

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={() => setShowCustomModal(false)}
                className="py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-rajdhani font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleCustomSubmit}
                className="py-2 rounded-xl bg-[#c89b3c] hover:bg-[#b88a2c] text-black font-orbitron font-bold text-xs"
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

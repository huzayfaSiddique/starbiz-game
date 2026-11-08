"use client";

import React from "react";
import { Landmark, X, Calculator, ShieldAlert, CheckCircle2 } from "lucide-react";

interface BankLoansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BankLoansModal({ isOpen, onClose }: BankLoansModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl rounded-3xl bg-[#090d21] border border-cyan-500/40 shadow-2xl p-5 sm:p-6 relative text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
          aria-label="Close Loans Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-400">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-orbitron text-xl font-black text-white">
              GALACTIC BANK LOANS & SETTLEMENT VALUE
            </h2>
            <span className="text-xs font-rajdhani text-slate-400">
              Institutional Debt Facilities (Maximum 2 Concurrent Loans per Tycoon)
            </span>
          </div>
        </div>

        {/* Small vs Big Loan Grids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {/* Small Loan Facility */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-orbitron font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                SMALL LOAN FACILITY
              </span>
              <h3 className="font-orbitron font-black text-2xl text-cyan-300 mt-2">
                1,500 ★ <span className="text-xs text-slate-400 font-normal">Principal</span>
              </h3>
              <p className="text-xs text-slate-400 font-rajdhani mt-1">
                Settlement Value prerequisite: <span className="text-white font-bold">750 to 1,500 Stars</span>
              </p>

              {/* Installment breakdown */}
              <div className="my-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-rajdhani space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Turns 1 to 3:</span>
                  <span className="text-slate-100 font-bold">75 ★ / turn (225 ★)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Turns 4 to 7:</span>
                  <span className="text-slate-100 font-bold">450 ★ / turn (1,800 ★)</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800 font-bold text-cyan-300">
                  <span>Total Repayment:</span>
                  <span>2,025 ★ (Over 7 turns)</span>
                </div>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-rajdhani">
              Deducted automatically at end of tycoon turn.
            </span>
          </div>

          {/* Big Loan Facility */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-orbitron font-extrabold uppercase px-2 py-0.5 rounded bg-amber-950 border border-amber-500/40 text-amber-300">
                BIG LOAN FACILITY
              </span>
              <h3 className="font-orbitron font-black text-2xl text-amber-300 mt-2">
                2,000 ★ <span className="text-xs text-slate-400 font-normal">Principal</span>
              </h3>
              <p className="text-xs text-slate-400 font-rajdhani mt-1">
                Settlement Value prerequisite: <span className="text-white font-bold">&gt; 1,500 Stars</span>
              </p>

              {/* Installment breakdown */}
              <div className="my-3 p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-rajdhani space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Turns 1 to 3:</span>
                  <span className="text-slate-100 font-bold">100 ★ / turn (300 ★)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Turns 4 to 7:</span>
                  <span className="text-slate-100 font-bold">600 ★ / turn (2,400 ★)</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-800 font-bold text-amber-300">
                  <span>Total Repayment:</span>
                  <span>2,700 ★ (Over 7 turns)</span>
                </div>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-rajdhani">
              Permitted for real estate expansion & upgrades.
            </span>
          </div>
        </div>

        {/* Settlement Value Formula */}
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs font-rajdhani text-slate-300">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-1">
            Settlement Value Balance Sheet Formula:
          </span>
          <p className="font-mono text-[11px] text-slate-200 bg-black/60 p-2 rounded-lg">
            Settlement Value = Liquid Cash + Owned Stars Cost + Invested Upgrades + (Lottery Tickets × 60★) − Remaining Debt
          </p>
        </div>
      </div>
    </div>
  );
}

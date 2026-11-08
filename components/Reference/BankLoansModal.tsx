"use client";

import React from "react";
import { Landmark, X, ShieldAlert, CheckCircle2, Coins } from "lucide-react";

interface BankLoansModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BankLoansModal({ isOpen, onClose }: BankLoansModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-ink-navy/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl rounded-3xl bg-[#FAF5EA] border-2 border-[#D4AF37] shadow-2xl p-5 sm:p-6 relative text-ink-navy">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-[#E2D5C3] text-ink-navy transition cursor-pointer"
          aria-label="Close Loans Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-[#FFF6E0] border border-[#D4AF37] text-[#8C6518]">
            <Landmark className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-orbitron text-xl font-black text-ink-navy">
              CENTRAL GALACTIC BANK LOANS
            </h2>
            <span className="text-xs font-rajdhani font-semibold text-slate-600">
              Institutional Debt Facilities (Maximum 2 Concurrent Loans per Tycoon)
            </span>
          </div>
        </div>

        {/* Small vs Big Loan Grids */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
          {/* Small Loan Facility */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#E2D5C3] hover:border-[#D4AF37] transition flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-orbitron font-extrabold uppercase px-2 py-0.5 rounded gold-badge">
                SMALL LOAN FACILITY
              </span>
              <h3 className="font-orbitron font-black text-2xl text-[#8C6518] mt-2">
                1,500 ★ <span className="text-xs text-slate-500 font-normal">Principal</span>
              </h3>
              <p className="text-xs text-slate-600 font-rajdhani mt-1">
                Settlement Value prerequisite: <span className="text-ink-navy font-bold">750 to 1,500 Stars</span>
              </p>

              {/* Installment breakdown */}
              <div className="my-3 p-3 rounded-xl bg-[#FAF5EA] border border-[#E2D5C3] text-xs font-rajdhani space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-600">Turns 1 to 3:</span>
                  <span className="text-ink-navy font-bold">75 ★ / turn (225 ★)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Turns 4 to 7:</span>
                  <span className="text-ink-navy font-bold">450 ★ / turn (1,800 ★)</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-[#E2D5C3] font-bold text-[#8C6518]">
                  <span>Total Repayment:</span>
                  <span>2,025 ★ (Over 7 turns)</span>
                </div>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-rajdhani font-medium">
              Repayment deducted at end of tycoon turn.
            </span>
          </div>

          {/* Big Loan Facility */}
          <div className="p-4 rounded-2xl bg-white border-2 border-[#E2D5C3] hover:border-[#D4AF37] transition flex flex-col justify-between shadow-sm">
            <div>
              <span className="text-[10px] font-orbitron font-extrabold uppercase px-2 py-0.5 rounded gold-badge">
                BIG LOAN FACILITY
              </span>
              <h3 className="font-orbitron font-black text-2xl text-[#8C6518] mt-2">
                2,000 ★ <span className="text-xs text-slate-500 font-normal">Principal</span>
              </h3>
              <p className="text-xs text-slate-600 font-rajdhani mt-1">
                Settlement Value prerequisite: <span className="text-ink-navy font-bold">&gt; 1,500 Stars</span>
              </p>

              {/* Installment breakdown */}
              <div className="my-3 p-3 rounded-xl bg-[#FAF5EA] border border-[#E2D5C3] text-xs font-rajdhani space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-600">Turns 1 to 3:</span>
                  <span className="text-ink-navy font-bold">100 ★ / turn (300 ★)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Turns 4 to 7:</span>
                  <span className="text-ink-navy font-bold">600 ★ / turn (2,400 ★)</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-[#E2D5C3] font-bold text-[#8C6518]">
                  <span>Total Repayment:</span>
                  <span>2,700 ★ (Over 7 turns)</span>
                </div>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-rajdhani font-medium">
              Settlement value evaluated before disbursement.
            </span>
          </div>
        </div>

        {/* Rules footer */}
        <div className="p-3 rounded-xl bg-[#F5ECE0] border border-[#E2D5C3] flex items-center justify-between text-xs font-rajdhani text-slate-700">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#1E6B47]" />
            <span>Borrowing available anytime on active tycoon turn</span>
          </div>
          <span className="font-bold text-[#8C6518]">Bank Capital Guaranteed</span>
        </div>
      </div>
    </div>
  );
}

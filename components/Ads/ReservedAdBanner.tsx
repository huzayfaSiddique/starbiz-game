"use client";

import React, { useState } from "react";
import { Megaphone, X } from "lucide-react";

interface ReservedAdBannerProps {
  position: "top" | "bottom";
  className?: string;
}

export default function ReservedAdBanner({ position, className = "" }: ReservedAdBannerProps) {
  // Enabled by default to show the client reserved slot, dismissible during live test
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <div
        className={`w-full flex items-center justify-center text-[10px] text-slate-500 py-1 transition ${className}`}
      >
        <button
          onClick={() => setIsVisible(true)}
          className="text-slate-400 hover:text-amber-300 underline"
        >
          Show Sponsor Slot
        </button>
      </div>
    );
  }

  return (
    <div
      className={`reserved-ad-slot-mobile w-full px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#0d122b]/95 via-[#161233]/95 to-[#0b1026]/95 border border-amber-500/40 shadow-lg flex items-center justify-between text-xs select-none transition-all ${className}`}
      aria-label="Sponsored Space"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="px-1.5 py-0.5 rounded bg-amber-400 text-black font-extrabold text-[9px] uppercase tracking-wider flex items-center gap-1 shrink-0">
          <Megaphone className="w-2.5 h-2.5" />
          Ad • 5s
        </span>
        <span className="text-amber-100 font-medium text-[11px] truncate">
          Official StarBiz Sponsor Slot — Reserved for Ads
        </span>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="text-slate-400 hover:text-white p-1 ml-1 rounded transition shrink-0"
        title="Hide demo banner"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

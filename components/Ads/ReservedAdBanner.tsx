"use client";

import React, { useState } from "react";
import { Megaphone, X } from "lucide-react";

interface ReservedAdBannerProps {
  position: "top" | "bottom";
  className?: string;
}

export default function ReservedAdBanner({ position, className = "" }: ReservedAdBannerProps) {
  // Enabled by default to demonstrate the client's reserved ad slot, dismissible during live play
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <div
        className={`w-full flex items-center justify-center text-[10px] text-slate-500 py-1 transition ${className}`}
      >
        <button
          onClick={() => setIsVisible(true)}
          className="text-[#8C6518] hover:underline cursor-pointer"
        >
          Show Sponsor Slot
        </button>
      </div>
    );
  }

  return (
    <div
      className={`reserved-ad-slot-mobile w-full px-3 py-1.5 rounded-xl bg-white border-2 border-[#D4AF37]/50 shadow-sm flex items-center justify-between text-xs select-none transition-all ${className}`}
      aria-label="Sponsored Space"
    >
      <div className="flex items-center gap-2 overflow-hidden">
        <span className="px-2 py-0.5 rounded-md gold-button text-black font-extrabold text-[9px] uppercase tracking-wider flex items-center gap-1 shrink-0">
          <Megaphone className="w-2.5 h-2.5 text-black" />
          Ad • 5s
        </span>
        <span className="text-ink-navy font-semibold text-[11px] truncate">
          Official StarBiz Sponsor Slot — Reserved for Ads (Zero CLS)
        </span>
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="text-slate-400 hover:text-ink-navy p-1 ml-1 rounded transition shrink-0 cursor-pointer"
        title="Hide demo banner"
        aria-label="Dismiss banner"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

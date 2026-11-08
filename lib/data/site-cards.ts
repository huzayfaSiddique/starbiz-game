export interface PropertyUpgradeLease {
  shop: [number, number];        // [normal, appreciated (+25%)]
  restaurant: [number, number];
  cinema: [number, number];
  hypermart: [number, number];
  mall: [number, number];
}

export interface SiteCard {
  id: number;
  galaxy: "ANDROMEDA" | "CENTAURUS" | "LYNX" | "MILKY WAY";
  name: string;
  cost: number;
  appCost: number;
  lease: number;
  appLease: number;
  star?: boolean;
  upgrades: PropertyUpgradeLease;
}

export const SITE_CARDS: SiteCard[] = [
  // ANDROMEDA (Tiles 1 - 6) - Color: Cyan / Cosmic Blue
  { id: 1, galaxy: "ANDROMEDA", name: "MEISSA", cost: 130, appCost: 170, lease: 60, appLease: 75, upgrades: { shop: [100, 130], restaurant: [220, 280], cinema: [350, 440], hypermart: [550, 690], mall: [750, 940] } },
  { id: 2, galaxy: "ANDROMEDA", name: "POLARIS", cost: 160, appCost: 200, lease: 70, appLease: 85, upgrades: { shop: [120, 150], restaurant: [250, 310], cinema: [400, 500], hypermart: [620, 780], mall: [850, 1060] } },
  { id: 3, galaxy: "ANDROMEDA", name: "SPICA", cost: 180, appCost: 230, lease: 80, appLease: 100, star: true, upgrades: { shop: [130, 160], restaurant: [280, 350], cinema: [450, 560], hypermart: [700, 880], mall: [900, 1130] } },
  { id: 4, galaxy: "ANDROMEDA", name: "ARRAKIS", cost: 200, appCost: 250, lease: 90, appLease: 110, star: true, upgrades: { shop: [150, 190], restaurant: [300, 380], cinema: [500, 630], hypermart: [740, 930], mall: [950, 1190] } },
  { id: 5, galaxy: "ANDROMEDA", name: "REGULUS", cost: 220, appCost: 280, lease: 100, appLease: 125, star: true, upgrades: { shop: [160, 200], restaurant: [350, 440], cinema: [580, 730], hypermart: [800, 1000], mall: [1000, 1250] } },
  { id: 6, galaxy: "ANDROMEDA", name: "ELECTRA", cost: 250, appCost: 320, lease: 110, appLease: 135, star: true, upgrades: { shop: [180, 230], restaurant: [370, 460], cinema: [600, 750], hypermart: [850, 1060], mall: [1050, 1310] } },

  // CENTAURUS (Tiles 7 - 12) - Color: Violet / Purple
  { id: 7, galaxy: "CENTAURUS", name: "MERAK", cost: 280, appCost: 350, lease: 125, appLease: 155, star: true, upgrades: { shop: [270, 340], restaurant: [550, 690], cinema: [900, 1130], hypermart: [1200, 1500], mall: [1500, 1880] } },
  { id: 8, galaxy: "CENTAURUS", name: "CASTOR", cost: 300, appCost: 380, lease: 135, appLease: 160, star: true, upgrades: { shop: [290, 360], restaurant: [600, 750], cinema: [950, 1190], hypermart: [1250, 1560], mall: [1600, 2000] } },
  { id: 9, galaxy: "CENTAURUS", name: "NASH", cost: 320, appCost: 400, lease: 145, appLease: 180, upgrades: { shop: [300, 380], restaurant: [650, 810], cinema: [1000, 1250], hypermart: [1300, 1630], mall: [1680, 2100] } },
  { id: 10, galaxy: "CENTAURUS", name: "HERSHEL", cost: 350, appCost: 440, lease: 155, appLease: 195, upgrades: { shop: [320, 400], restaurant: [700, 880], cinema: [1100, 1380], hypermart: [1400, 1750], mall: [1750, 2190] } },
  { id: 11, galaxy: "CENTAURUS", name: "ALRISHA", cost: 380, appCost: 480, lease: 165, appLease: 210, upgrades: { shop: [340, 430], restaurant: [750, 940], cinema: [1150, 1440], hypermart: [1500, 1880], mall: [1850, 2310] } },
  { id: 12, galaxy: "CENTAURUS", name: "CAPELLA", cost: 390, appCost: 490, lease: 175, appLease: 230, upgrades: { shop: [350, 440], restaurant: [820, 1030], cinema: [1200, 1500], hypermart: [1550, 1940], mall: [1900, 2380] } },

  // LYNX (Tiles 13 - 18) - Color: Emerald / Green
  { id: 13, galaxy: "LYNX", name: "DANEB", cost: 420, appCost: 530, lease: 195, appLease: 245, upgrades: { shop: [400, 500], restaurant: [880, 1100], cinema: [1400, 1750], hypermart: [1850, 2310], mall: [2300, 2880] } },
  { id: 14, galaxy: "LYNX", name: "ANTARES", cost: 430, appCost: 540, lease: 205, appLease: 255, upgrades: { shop: [430, 540], restaurant: [900, 1130], cinema: [1450, 1790], hypermart: [1900, 2370], mall: [2350, 2940] } },
  { id: 15, galaxy: "LYNX", name: "MIRA", cost: 450, appCost: 570, lease: 225, appLease: 270, star: true, upgrades: { shop: [450, 560], restaurant: [950, 1190], cinema: [1500, 1880], hypermart: [1950, 2440], mall: [2400, 3000] } },
  { id: 16, galaxy: "LYNX", name: "CANOPUS", cost: 480, appCost: 600, lease: 245, appLease: 305, upgrades: { shop: [500, 630], restaurant: [1000, 1250], cinema: [1530, 1950], hypermart: [2000, 2500], mall: [2500, 3130] } },
  { id: 17, galaxy: "LYNX", name: "BELLATRIX", cost: 520, appCost: 650, lease: 265, appLease: 330, star: true, upgrades: { shop: [550, 690], restaurant: [1050, 1320], cinema: [1600, 2000], hypermart: [2050, 2560], mall: [2600, 3250] } },
  { id: 18, galaxy: "LYNX", name: "ALGOL", cost: 550, appCost: 690, lease: 285, appLease: 355, upgrades: { shop: [600, 750], restaurant: [1100, 1380], cinema: [1650, 2060], hypermart: [2150, 2690], mall: [2700, 3380] } },

  // MILKY WAY (Tiles 19 - 24) - Color: Radiant Gold / Amber
  { id: 19, galaxy: "MILKY WAY", name: "MIMOSA", cost: 580, appCost: 730, lease: 310, appLease: 385, upgrades: { shop: [650, 810], restaurant: [1250, 1560], cinema: [1850, 2310], hypermart: [2450, 3060], mall: [3100, 3880] } },
  { id: 20, galaxy: "MILKY WAY", name: "POLLUX", cost: 630, appCost: 790, lease: 340, appLease: 420, upgrades: { shop: [700, 880], restaurant: [1300, 1630], cinema: [1950, 2440], hypermart: [2600, 3190], mall: [3250, 4060] } },
  { id: 21, galaxy: "MILKY WAY", name: "ALDEBARAN", cost: 650, appCost: 820, lease: 350, appLease: 440, upgrades: { shop: [750, 940], restaurant: [1400, 1750], cinema: [2050, 2560], hypermart: [2700, 3380], mall: [3400, 4250] } },
  { id: 22, galaxy: "MILKY WAY", name: "RIGEL", cost: 690, appCost: 870, lease: 380, appLease: 475, upgrades: { shop: [800, 1000], restaurant: [1500, 1880], cinema: [2250, 2810], hypermart: [2900, 3630], mall: [3600, 4500] } },
  { id: 23, galaxy: "MILKY WAY", name: "VEGA", cost: 740, appCost: 930, lease: 420, appLease: 525, upgrades: { shop: [850, 1060], restaurant: [1550, 1940], cinema: [2300, 2880], hypermart: [3050, 3810], mall: [3800, 4750] } },
  { id: 24, galaxy: "MILKY WAY", name: "SIRIUS", cost: 790, appCost: 990, lease: 450, appLease: 565, star: true, upgrades: { shop: [900, 1130], restaurant: [1700, 2130], cinema: [2500, 3130], hypermart: [3250, 4060], mall: [4200, 5260] } }
];

export const GALAXY_THEMES = {
  ANDROMEDA: {
    name: "Andromeda",
    color: "#00f0ff",
    bgGradient: "from-cyan-950/40 to-blue-950/20",
    border: "border-cyan-400/50",
    badge: "bg-cyan-500/20 text-cyan-300 border-cyan-400/40",
    glow: "shadow-[0_0_15px_rgba(0,240,255,0.3)]",
  },
  CENTAURUS: {
    name: "Centaurus",
    color: "#b829ff",
    bgGradient: "from-purple-950/40 to-indigo-950/20",
    border: "border-purple-400/50",
    badge: "bg-purple-500/20 text-purple-300 border-purple-400/40",
    glow: "shadow-[0_0_15px_rgba(184,41,255,0.3)]",
  },
  LYNX: {
    name: "Lynx",
    color: "#00ff88",
    bgGradient: "from-emerald-950/40 to-teal-950/20",
    border: "border-emerald-400/50",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
    glow: "shadow-[0_0_15px_rgba(0,255,136,0.3)]",
  },
  "MILKY WAY": {
    name: "Milky Way",
    color: "#ffd026",
    bgGradient: "from-amber-950/40 to-yellow-950/20",
    border: "border-amber-400/50",
    badge: "bg-amber-500/20 text-amber-300 border-amber-400/40",
    glow: "shadow-[0_0_15px_rgba(255,208,38,0.3)]",
  },
};

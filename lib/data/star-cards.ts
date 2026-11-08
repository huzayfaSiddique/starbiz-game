export type CardDeckType = "YELLOW" | "GREEN";

export interface StarCard {
  id: number;
  deck: CardDeckType;
  title: string;
  icon: string;
  instruction: string;
  type: "location_stars" | "building_table" | "dice_formula" | "flat" | "location_lotteries" | "movement" | "choice" | "appreciation";
  mode?: "collect" | "pay" | "offer" | "choice";
  values?: Record<string, string>;
  ticketMap?: Record<string, number>;
  rules?: string[];
  resultText?: string;
  badge?: string;
  formulaDescription?: string;
  evaluateDiceFormula?: (diceValue: number) => { text: string; amount?: number; tickets?: number };
}

export const YELLOW_STAR_CARDS: StarCard[] = [
  {
    id: 1,
    deck: "YELLOW",
    title: "STAR PRIZE",
    icon: "🌟",
    instruction: "Collect Stars according to your current location:",
    type: "location_stars",
    mode: "collect",
    values: {
      ANDROMEDA: "100 ★",
      CENTAURUS: "200 ★",
      LYNX: "300 ★",
      "MILKY WAY": "400 ★",
    },
  },
  {
    id: 2,
    deck: "YELLOW",
    title: "BUILDINGS REWARD",
    icon: "🏢",
    instruction: "Collect Stars as per your buildings' locations and upgrades:",
    type: "building_table",
    mode: "collect",
    values: {
      ANDROMEDA: "Shop 20 | Rest 40 | Cin 60 | Hyp 80 | Mall 100",
      CENTAURUS: "Shop 30 | Rest 60 | Cin 90 | Hyp 120 | Mall 150",
      LYNX: "Shop 40 | Rest 80 | Cin 120 | Hyp 160 | Mall 200",
      "MILKY WAY": "Shop 50 | Rest 100 | Cin 150 | Hyp 200 | Mall 250",
    },
  },
  {
    id: 3,
    deck: "YELLOW",
    title: "RENOVATION REWARD",
    icon: "🛠️",
    instruction: "Collect Stars for your properties according to their locations:",
    type: "location_stars",
    mode: "collect",
    values: {
      ANDROMEDA: "50 ★ / prop",
      CENTAURUS: "100 ★ / prop",
      LYNX: "150 ★ / prop",
      "MILKY WAY": "200 ★ / prop",
    },
  },
  {
    id: 4,
    deck: "YELLOW",
    title: "ILLEGAL BUSINESS",
    icon: "🚨",
    instruction: "Pay a fine according to your current location:",
    type: "location_stars",
    mode: "pay",
    values: {
      ANDROMEDA: "150 ★",
      CENTAURUS: "250 ★",
      LYNX: "350 ★",
      "MILKY WAY": "450 ★",
    },
  },
  {
    id: 5,
    deck: "YELLOW",
    title: "FRAUD FINE",
    icon: "⚖️",
    instruction: "You've been fined for fraud! Calculated using your 1d15 Dice Value:",
    type: "dice_formula",
    rules: [
      "If Dice Value is a multiple of 3 (3, 6, 9, 12, 15): Pay 20 × Dice Value",
      "Otherwise: Pay 30 × Dice Value",
    ],
    evaluateDiceFormula: (d) => {
      const isMod3 = d % 3 === 0;
      const amt = isMod3 ? 20 * d : 30 * d;
      return {
        text: isMod3
          ? `Dice (${d}) is a multiple of 3 → Pay ${amt} ★ (20 × ${d})`
          : `Dice (${d}) is NOT a multiple of 3 → Pay ${amt} ★ (30 × ${d})`,
        amount: amt,
      };
    },
  },
  {
    id: 6,
    deck: "YELLOW",
    title: "SHOP LICENCE",
    icon: "📜",
    instruction: "Renew your Shop Licence! Pay the licence fee according to your location:",
    type: "location_stars",
    mode: "pay",
    values: {
      ANDROMEDA: "150 ★",
      CENTAURUS: "250 ★",
      LYNX: "350 ★",
      "MILKY WAY": "450 ★",
    },
  },
  {
    id: 7,
    deck: "YELLOW",
    title: "BLACK MARKET",
    icon: "🕵️",
    instruction: "Caught selling goods on the black market!",
    type: "flat",
    resultText: "Pay a flat fine of 300 ★ Stars immediately.",
    badge: "FINE: 300 ★",
  },
  {
    id: 8,
    deck: "YELLOW",
    title: "LOTTERY BONUS (÷4)",
    icon: "🎟️",
    instruction: "Lottery Bonus! Calculated from your 1d15 Propulsion Dice Value:",
    type: "dice_formula",
    rules: [
      "If Dice Value is a multiple of 4 (4, 8, 12): Collect 6 Free Lotteries",
      "Otherwise: Collect 4 Free Lotteries",
    ],
    evaluateDiceFormula: (d) => {
      const isMod4 = d % 4 === 0;
      const tix = isMod4 ? 6 : 4;
      return {
        text: isMod4
          ? `Dice (${d}) is a multiple of 4 → Collect 6 Free Lotteries!`
          : `Dice (${d}) is NOT a multiple of 4 → Collect 4 Free Lotteries!`,
        tickets: tix,
      };
    },
  },
  {
    id: 9,
    deck: "YELLOW",
    title: "LOTTERY BONUS (÷5)",
    icon: "🎟️",
    instruction: "Lottery Bonus! Calculated from your 1d15 Propulsion Dice Value:",
    type: "dice_formula",
    rules: [
      "If Dice Value is a multiple of 5 (5, 10, 15): Collect 6 Free Lotteries",
      "Otherwise: Collect 4 Free Lotteries",
    ],
    evaluateDiceFormula: (d) => {
      const isMod5 = d % 5 === 0;
      const tix = isMod5 ? 6 : 4;
      return {
        text: isMod5
          ? `Dice (${d}) is a multiple of 5 → Collect 6 Free Lotteries!`
          : `Dice (${d}) is NOT a multiple of 5 → Collect 4 Free Lotteries!`,
        tickets: tix,
      };
    },
  },
  {
    id: 10,
    deck: "YELLOW",
    title: "LUCKY FIND",
    icon: "🍀",
    instruction: "Collect Free Lottery Tickets according to your current location:",
    type: "location_lotteries",
    values: {
      ANDROMEDA: "6 Lotteries",
      CENTAURUS: "5 Lotteries",
      LYNX: "4 Lotteries",
      "MILKY WAY": "3 Lotteries",
    },
    ticketMap: {
      ANDROMEDA: 6,
      CENTAURUS: 5,
      LYNX: 4,
      "MILKY WAY": 3,
    },
  },
  {
    id: 11,
    deck: "YELLOW",
    title: "DISCOUNT LOTTERIES",
    icon: "🏷️",
    instruction: "Special Lottery Offer! You may buy up to 6 Lottery Tickets at the discounted price for your location:",
    type: "location_stars",
    mode: "offer",
    values: {
      ANDROMEDA: "50 ★ / ticket",
      CENTAURUS: "40 ★ / ticket",
      LYNX: "30 ★ / ticket",
      "MILKY WAY": "20 ★ / ticket",
    },
  },
  {
    id: 12,
    deck: "YELLOW",
    title: "GALACTIC EXPRESS",
    icon: "🚀",
    instruction: "Move Ahead! Move directly to the Highest-Value Property in the Next Galaxy.",
    type: "movement",
    resultText: "Advance to Highest-Value Property in Next Galaxy (Meissa→Capella→Algol→Sirius). Collect all due Lotteries & bonuses!",
  },
  {
    id: 13,
    deck: "YELLOW",
    title: "LOAN REWARD",
    icon: "🏦",
    instruction: "Reward based on your Galactic Loan history:",
    type: "choice",
    rules: [
      "If you have EVER taken a Loan: Collect 400 ★",
      "If you have NEVER taken a Loan: Collect 250 ★",
    ],
  },
  {
    id: 14,
    deck: "YELLOW",
    title: "GO BACK",
    icon: "⏪",
    instruction: "Wrong Turn! Carry out the movement immediately:",
    type: "movement",
    resultText: "Move 4 Spaces Backwards immediately. Execute landing tile actions.",
  },
  {
    id: 15,
    deck: "YELLOW",
    title: "LOAN LOTTERY BONUS",
    icon: "🎟️",
    instruction: "Loan Bonus! Collect Lotteries based on your current Loan status:",
    type: "choice",
    rules: [
      "If you have an active Loan: Collect 6 Lotteries",
      "Otherwise: Collect 4 Lotteries",
    ],
  },
  {
    id: 16,
    deck: "YELLOW",
    title: "FINE OR LOTTERIES",
    icon: "⚖️",
    instruction: "Choose Your Option! Either Pay a 200-Star Fine OR Buy 3 Lotteries at the total price for your location:",
    type: "location_stars",
    mode: "choice",
    values: {
      ANDROMEDA: "400 ★ (for 3)",
      CENTAURUS: "390 ★ (for 3)",
      LYNX: "380 ★ (for 3)",
      "MILKY WAY": "370 ★ (for 3)",
    },
  },
  {
    id: 17,
    deck: "YELLOW",
    title: "LOWEST-VALUE PROPERTY",
    icon: "🛸",
    instruction: "Travel to the Next Galaxy!",
    type: "movement",
    resultText: "Move directly to the Lowest-Value Property in the Next Galaxy (Meissa / Merak / Daneb / Mimosa).",
  },
  {
    id: 18,
    deck: "YELLOW",
    title: "BEST IMPROVED PROPERTY",
    icon: "🏙️",
    instruction: "Business Opportunity Ahead!",
    type: "movement",
    resultText: "Move directly to the Highest Improved Property (upgraded beyond default site level) in the Next Galaxy.",
  },
  {
    id: 19,
    deck: "YELLOW",
    title: "ROYALTY PAYMENT",
    icon: "👑",
    instruction: "Royalty Payment Due! Checked against your 1d15 Dice Value:",
    type: "dice_formula",
    rules: [
      "If Dice Value is a multiple of 5 (5, 10, 15): Pay 250 ★",
      "Otherwise: Pay 200 ★",
    ],
    evaluateDiceFormula: (d) => {
      const isMod5 = d % 5 === 0;
      const amt = isMod5 ? 250 : 200;
      return {
        text: isMod5
          ? `Dice (${d}) is a multiple of 5 → Pay 250 ★`
          : `Dice (${d}) is NOT a multiple of 5 → Pay 200 ★`,
        amount: amt,
      };
    },
  },
  {
    id: 20,
    deck: "YELLOW",
    title: "STEP BACK",
    icon: "↩️",
    instruction: "Minor Setback!",
    type: "movement",
    resultText: "Move 1 Space Backwards immediately and trigger tile actions.",
  },
  {
    id: 21,
    deck: "YELLOW",
    title: "APPRECIATED PROPERTY",
    icon: "📈",
    instruction: "Return to a Valuable Investment!",
    type: "movement",
    resultText: "Go back to the Highest Appreciated Property in the Previous Galaxy.",
  },
  {
    id: 22,
    deck: "YELLOW",
    title: "PANDEMIC SUPPORT",
    icon: "🧬",
    instruction: "Support the Fight Against New Pandemics! Collect Stars according to your current location:",
    type: "location_stars",
    mode: "collect",
    values: {
      ANDROMEDA: "100 ★",
      CENTAURUS: "200 ★",
      LYNX: "300 ★",
      "MILKY WAY": "400 ★",
    },
  },
  {
    id: 23,
    deck: "YELLOW",
    title: "ANIMAL PROTECTION",
    icon: "🐾",
    instruction: "Support Animal Protection! Collect Stars according to your current location:",
    type: "location_stars",
    mode: "collect",
    values: {
      ANDROMEDA: "150 ★",
      CENTAURUS: "250 ★",
      LYNX: "350 ★",
      "MILKY WAY": "450 ★",
    },
  },
  {
    id: 24,
    deck: "YELLOW",
    title: "CLIMATE CHANGE",
    icon: "🌍",
    instruction: "Fight Climate Change! Donate Stars according to your current location:",
    type: "location_stars",
    mode: "pay",
    values: {
      ANDROMEDA: "200 ★",
      CENTAURUS: "300 ★",
      LYNX: "400 ★",
      "MILKY WAY": "500 ★",
    },
  },
];

export const GREEN_STAR_CARDS: StarCard[] = [
  {
    id: 1,
    deck: "GREEN",
    title: "TELECOM OPPORTUNITY",
    icon: "📡",
    instruction: "Choose ONE of the following corporate options:",
    type: "choice",
    rules: [
      "Option A: Buy any available Telecom Service for a flat 100 ★",
      "Option B: Collect 100 ★ as recovered bad debt",
    ],
  },
  {
    id: 2,
    deck: "GREEN",
    title: "DICE REWARD",
    icon: "🎲",
    instruction: "Lucky Roll! Collect Stars based on your 1d15 Dice Value:",
    type: "dice_formula",
    rules: [
      "If Dice Value is a multiple of 3 (3, 6, 9, 12, 15): Collect 30 × Dice Value",
      "Otherwise: Collect 20 × Dice Value",
    ],
    evaluateDiceFormula: (d) => {
      const isMod3 = d % 3 === 0;
      const amt = isMod3 ? 30 * d : 20 * d;
      return {
        text: isMod3
          ? `Dice (${d}) is a multiple of 3 → Collect ${amt} ★ (30 × ${d})!`
          : `Dice (${d}) is NOT a multiple of 3 → Collect ${amt} ★ (20 × ${d})!`,
        amount: amt,
      };
    },
  },
  {
    id: 3,
    deck: "GREEN",
    title: "SALARY INCREASE",
    icon: "💰",
    instruction: "Collect Stars according to your current location:",
    type: "location_stars",
    mode: "collect",
    values: {
      ANDROMEDA: "100 ★",
      CENTAURUS: "200 ★",
      LYNX: "300 ★",
      "MILKY WAY": "400 ★",
    },
  },
  {
    id: 4,
    deck: "GREEN",
    title: "EXPIRED GOODS",
    icon: "⚠️",
    instruction: "Caught Selling Expired Goods! Pay a fine according to your location:",
    type: "location_stars",
    mode: "pay",
    values: {
      ANDROMEDA: "100 ★",
      CENTAURUS: "200 ★",
      LYNX: "300 ★",
      "MILKY WAY": "400 ★",
    },
  },
  {
    id: 5,
    deck: "GREEN",
    title: "PROPERTY REGISTRATION",
    icon: "📋",
    instruction: "For each property you own across the board, pay the registration fee based on that sector:",
    type: "location_stars",
    mode: "pay",
    values: {
      ANDROMEDA: "50 ★ / prop",
      CENTAURUS: "100 ★ / prop",
      LYNX: "150 ★ / prop",
      "MILKY WAY": "200 ★ / prop",
    },
  },
  {
    id: 6,
    deck: "GREEN",
    title: "INCOME TAX",
    icon: "🏛️",
    instruction: "Income Tax Due! Checked against your real-estate portfolio:",
    type: "choice",
    rules: [
      "If you own at least one Appreciated Property: Pay 350 ★",
      "Otherwise: Pay 150 ★",
    ],
  },
  {
    id: 7,
    deck: "GREEN",
    title: "ILLEGAL CLEARANCE",
    icon: "🚧",
    instruction: "Security Audit Fine! Checked against your 1d15 Dice Value:",
    type: "dice_formula",
    rules: [
      "If Dice Value is a multiple of 4 (4, 8, 12): Pay 150 ★",
      "Otherwise: Pay 250 ★",
    ],
    evaluateDiceFormula: (d) => {
      const isMod4 = d % 4 === 0;
      const amt = isMod4 ? 150 : 250;
      return {
        text: isMod4
          ? `Dice (${d}) is a multiple of 4 → Pay 150 ★`
          : `Dice (${d}) is NOT a multiple of 4 → Pay 250 ★`,
        amount: amt,
      };
    },
  },
  {
    id: 8,
    deck: "GREEN",
    title: "PAY INSURANCE",
    icon: "🛡️",
    instruction: "Pay Insurance on your buildings as per their locations and upgrade levels:",
    type: "building_table",
    mode: "pay",
    values: {
      ANDROMEDA: "Shop 20 | Rest 40 | Cin 60 | Hyp 80 | Mall 100",
      CENTAURUS: "Shop 30 | Rest 60 | Cin 90 | Hyp 120 | Mall 150",
      LYNX: "Shop 40 | Rest 80 | Cin 120 | Hyp 160 | Mall 200",
      "MILKY WAY": "Shop 50 | Rest 100 | Cin 150 | Hyp 200 | Mall 250",
    },
  },
  {
    id: 9,
    deck: "GREEN",
    title: "SMUGGLING FINE",
    icon: "🚨",
    instruction: "Caught Smuggling! Fine calculated from your 1d15 Dice Value:",
    type: "dice_formula",
    rules: [
      "If Dice Value is a multiple of 3 (3, 6, 9, 12, 15): Pay 30 × Dice Value",
      "Otherwise: Pay 40 × Dice Value",
    ],
    evaluateDiceFormula: (d) => {
      const isMod3 = d % 3 === 0;
      const amt = isMod3 ? 30 * d : 40 * d;
      return {
        text: isMod3
          ? `Dice (${d}) is a multiple of 3 → Pay ${amt} ★ (30 × ${d})`
          : `Dice (${d}) is NOT a multiple of 3 → Pay ${amt} ★ (40 × ${d})`,
        amount: amt,
      };
    },
  },
  {
    id: 10,
    deck: "GREEN",
    title: "LOTTERY DEAL",
    icon: "🎟️",
    instruction: "Special Lottery Deal based on whether your 1d15 Dice is ODD or EVEN:",
    type: "dice_formula",
    rules: [
      "If Dice Value is ODD (1, 3, 5, 7, 9, 11, 13, 15): Buy up to 6 Lotteries at 30 ★ each",
      "If Dice Value is EVEN (2, 4, 6, 8, 10, 12, 14): Buy up to 4 Lotteries at 30 ★ each",
    ],
    evaluateDiceFormula: (d) => {
      const isOdd = d % 2 !== 0;
      const count = isOdd ? 6 : 4;
      return {
        text: isOdd
          ? `Dice (${d}) is ODD → Buy up to 6 Lotteries at 30 ★ each (Total ${count * 30} ★)`
          : `Dice (${d}) is EVEN → Buy up to 4 Lotteries at 30 ★ each (Total ${count * 30} ★)`,
        tickets: count,
      };
    },
  },
  {
    id: 11,
    deck: "GREEN",
    title: "LOTTERY COLLECTION",
    icon: "🎁",
    instruction: "Collect Free Lotteries according to your current location:",
    type: "location_lotteries",
    values: {
      ANDROMEDA: "3 Lotteries",
      CENTAURUS: "4 Lotteries",
      LYNX: "5 Lotteries",
      "MILKY WAY": "6 Lotteries",
    },
    ticketMap: {
      ANDROMEDA: 3,
      CENTAURUS: 4,
      LYNX: 5,
      "MILKY WAY": 6,
    },
  },
  {
    id: 12,
    deck: "GREEN",
    title: "LOTTERY PURCHASE",
    icon: "🛒",
    instruction: "You may buy up to 6 Lotteries at the wholesale price for your location:",
    type: "location_stars",
    mode: "offer",
    values: {
      ANDROMEDA: "20 ★ / Lottery",
      CENTAURUS: "30 ★ / Lottery",
      LYNX: "40 ★ / Lottery",
      "MILKY WAY": "50 ★ / Lottery",
    },
  },
  {
    id: 13,
    deck: "GREEN",
    title: "HIGHEST PROPERTY BOOM",
    icon: "📈",
    instruction: "Your Best Property Is Booming!",
    type: "appreciation",
    resultText: "Your Highest-Value Property permanently appreciates by +25% on values and rents!",
  },
  {
    id: 14,
    deck: "GREEN",
    title: "LOWEST PROPERTY BOOM",
    icon: "📊",
    instruction: "Emerging Sector Growth!",
    type: "appreciation",
    resultText: "Your Lowest-Value Property permanently appreciates by +25% on values and rents!",
  },
  {
    id: 15,
    deck: "GREEN",
    title: "LOWEST IMPROVED PROPERTY",
    icon: "🚀",
    instruction: "Move to the Next Galaxy!",
    type: "movement",
    resultText: "Move directly to the Lowest Improved Property in the Next Galaxy. Collect all due Lotteries & Bonuses.",
  },
  {
    id: 16,
    deck: "GREEN",
    title: "HIGHEST APPRECIATED PROPERTY",
    icon: "🌟",
    instruction: "Galactic Property Rush!",
    type: "movement",
    resultText: "Move directly to the Highest Appreciated Property in the Next Galaxy. Collect all due Lotteries & Bonuses.",
  },
  {
    id: 17,
    deck: "GREEN",
    title: "LOWEST APPRECIATED PROPERTY",
    icon: "🛸",
    instruction: "Investment Journey!",
    type: "movement",
    resultText: "Move directly to the Lowest Appreciated Property in the Next Galaxy. Collect all due Lotteries & Bonuses.",
  },
  {
    id: 18,
    deck: "GREEN",
    title: "FIVE SPACES FORWARD",
    icon: "⏩",
    instruction: "Full Speed Propulsion!",
    type: "movement",
    resultText: "Move 5 Spaces Forward. Collect all due Lotteries and passing bonuses during the move.",
  },
  {
    id: 19,
    deck: "GREEN",
    title: "ONE SPACE FORWARD",
    icon: "▶️",
    instruction: "Advance!",
    type: "movement",
    resultText: "Move 1 Space Forward and trigger target space action.",
  },
  {
    id: 20,
    deck: "GREEN",
    title: "PREVIOUS GALAXY",
    icon: "⏪",
    instruction: "Retrograde Warp!",
    type: "movement",
    resultText: "Move back to the Least Improved Property in the Previous Galaxy.",
  },
  {
    id: 21,
    deck: "GREEN",
    title: "EDUCATION & HEALTH",
    icon: "🎓",
    instruction: "Support Children in Need! Donate Stars according to your current location:",
    type: "location_stars",
    mode: "pay",
    values: {
      ANDROMEDA: "100 ★",
      CENTAURUS: "200 ★",
      LYNX: "300 ★",
      "MILKY WAY": "400 ★",
    },
  },
  {
    id: 22,
    deck: "GREEN",
    title: "ANIMAL BIOSPHERE (G)",
    icon: "🐾",
    instruction: "Support Animal Sanctuary! Donate Stars according to your current location:",
    type: "location_stars",
    mode: "pay",
    values: {
      ANDROMEDA: "100 ★",
      CENTAURUS: "200 ★",
      LYNX: "300 ★",
      "MILKY WAY": "400 ★",
    },
  },
  {
    id: 23,
    deck: "GREEN",
    title: "HEALTH SUPPORT",
    icon: "🏥",
    instruction: "Public Health Subsidy! Collect Stars according to your current location:",
    type: "location_stars",
    mode: "collect",
    values: {
      ANDROMEDA: "200 ★",
      CENTAURUS: "300 ★",
      LYNX: "400 ★",
      "MILKY WAY": "500 ★",
    },
  },
  {
    id: 24,
    deck: "GREEN",
    title: "FREE ACCESS (STARBRIDGE)",
    icon: "🌉",
    instruction: "Special Interstellar Toll Pass!",
    type: "flat",
    resultText: "Use ANY of the StarBridges without paying the cash toll! Keep card until used, then return to deck.",
    badge: "FREE STARBRIDGE PASS",
  },
];

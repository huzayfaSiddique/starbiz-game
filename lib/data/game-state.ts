export interface PlayerState {
  id: string;
  name: string;
  tokenColor: string;
  spaceshipIcon: string;
  starsBalance: number;
  ownedPropertyIds: number[];
  propertyUpgrades: Record<number, number>; // propertyId -> tier (0: raw, 1: shop, 2: rest, 3: cinema, 4: hyper, 5: mall)
  heldLotteryTickets: number;
  hasStarbridgePass: boolean;
}

export const INITIAL_PLAYERS: PlayerState[] = [
  {
    id: "p1",
    name: "Tycoon 1 (Andromeda)",
    tokenColor: "#00b4d8", // Cyan-blue
    spaceshipIcon: "🚀",
    starsBalance: 3000,
    ownedPropertyIds: [],
    propertyUpgrades: {},
    heldLotteryTickets: 0,
    hasStarbridgePass: false,
  },
  {
    id: "p2",
    name: "Tycoon 2 (Centaurus)",
    tokenColor: "#9d4edd", // Violet-purple
    spaceshipIcon: "🛸",
    starsBalance: 3000,
    ownedPropertyIds: [],
    propertyUpgrades: {},
    heldLotteryTickets: 0,
    hasStarbridgePass: false,
  },
  {
    id: "p3",
    name: "Tycoon 3 (Lynx)",
    tokenColor: "#2a9d8f", // Emerald-green
    spaceshipIcon: "🛰️",
    starsBalance: 3000,
    ownedPropertyIds: [],
    propertyUpgrades: {},
    heldLotteryTickets: 0,
    hasStarbridgePass: false,
  },
  {
    id: "p4",
    name: "Tycoon 4 (Milky Way)",
    tokenColor: "#e76f51", // Solar-gold/orange
    spaceshipIcon: "🪐",
    starsBalance: 3000,
    ownedPropertyIds: [],
    propertyUpgrades: {},
    heldLotteryTickets: 0,
    hasStarbridgePass: false,
  },
];

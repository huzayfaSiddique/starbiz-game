export interface TelecomCard {
  galaxy: "ANDROMEDA" | "CENTAURUS" | "LYNX" | "MILKY WAY";
  name: string;
  cost: number;
  lease: number;
}

export const TELECOM_CARDS: TelecomCard[] = [
  { galaxy: "ANDROMEDA", name: "TELECOM SERVICE (ANDROMEDA)", cost: 75, lease: 90 },
  { galaxy: "CENTAURUS", name: "TELECOM SERVICE (CENTAURUS)", cost: 150, lease: 135 },
  { galaxy: "LYNX", name: "TELECOM SERVICE (LYNX)", cost: 225, lease: 165 },
  { galaxy: "MILKY WAY", name: "TELECOM SERVICE (MILKY WAY)", cost: 300, lease: 210 },
];

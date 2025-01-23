export const Symbols ={
    BTCUSDT: "BTCUSDT",
    BNBUSDT: "BNBUSDT",
    TRUMPUSDT: "TRUMPUSDT",
    ETHUSDT: "ETHUSDT",
    SOLUSDT: "SOLUSDT",
    DOGEUSDT: "DOGEUSDT",
    PEPEUSDT: "PEPEUSDT"
} as const;

export type SymbolType = typeof Symbols[keyof typeof Symbols];
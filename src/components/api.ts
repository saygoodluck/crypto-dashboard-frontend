import { Symbols } from "../enumeration/Symbols.ts";
import axios from "axios";

export type Quote = {
    symbol: string;
    lastPrice: number;
    quoteVolume: number;
    priceChangePercent: number;
};

export const fetchQuotes = async (symbols: string[] = Object.values(Symbols)): Promise<Quote[]> => {
    try {
        const response = await axios.get<Quote[]>("https://api.binance.com/api/v3/ticker/24hr", {
            params: {
                symbols: JSON.stringify(symbols)
            }
        });

        return response.data;
    } catch (error) {
        console.error("Ошибка при загрузке котировок:", error);
        return [];
    }
};
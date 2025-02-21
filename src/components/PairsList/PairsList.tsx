import React, {useEffect, useState, useCallback} from "react";
import "./PairsList.css";
import axios from "axios";
import {Quote} from "../api.ts";
import {Symbols, SymbolType} from "../../enumeration/Symbols.ts";
import {formatVolume, round, roundNumber} from "../../utils/currencyUtils.ts";

interface PairsListProps {
    symbols?: SymbolType[];
}

const PairsList: React.FC<PairsListProps> = ({symbols = Object.values(Symbols),}) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchQuotes = useCallback(async () => {
        try {
            const {data} = await axios.get<Quote[]>(
                import.meta.env.VITE_BINANCE_API,
                {
                    params: {
                        symbols: JSON.stringify(symbols),
                    },
                }
            );
            setQuotes(data);
        } catch (error) {
            console.error("Ошибка при загрузке котировок:", error);
        } finally {
            setLoading(false);
        }
    }, [symbols]);

    useEffect(() => {
        fetchQuotes();
        const intervalId = setInterval(fetchQuotes, 1000);
        return () => clearInterval(intervalId);
    }, [fetchQuotes]);

    return (
        <div className="pairs-list">
            <main>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="crypto-table">
                        <thead>
                        <tr>
                            <th>Token</th>
                            <th>Price</th>
                            <th>Volume</th>
                            <th>Last 24H %</th>
                        </tr>
                        </thead>
                        <tbody>
                        {quotes.map((quote) => (
                            <tr key={quote.symbol}>
                                <td>{quote.symbol}</td>
                                <td style={{fontWeight: "bold"}}>
                                    {roundNumber(quote.lastPrice)}
                                </td>
                                <td>{formatVolume(quote.quoteVolume)}</td>
                                <td
                                    style={{
                                        color: quote.priceChangePercent > 0 ? "green" : "red",
                                    }}
                                >
                                    {round(quote.priceChangePercent)} %
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    );
};

export default PairsList;
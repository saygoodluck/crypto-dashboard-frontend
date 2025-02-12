import { useEffect, useState } from "react";
import "./PairsList.css";
import { Quote } from "../api.ts";
import axios from "axios";
import { Symbols } from "../../enumeration/Symbols.ts";
import { round, formatPrice } from '../../utils/currencyUtils.ts'
import { SymbolType } from "../../enumeration/Symbols.ts";

interface PairsListProps {
    symbols?: SymbolType[];
}

const PairsList: React.FC<PairsListProps> = ({ symbols = Object.values(Symbols) }) => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchQuotes = async (): Promise<void> => {
        try {
            const response = await axios.get<Quote[]>(import.meta.env.VITE_BINANCE_API, {
                params: {
                    symbols: JSON.stringify(symbols)
                }
            });
            setQuotes(response.data);
        } catch (error) {
            console.error("Ошибка при загрузке котировок:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // setLoading(true);
        fetchQuotes();

        const interval = setInterval(() => {
            fetchQuotes();
        }, 1000);

        return () => clearInterval(interval);
    }, [symbols]);

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
                            {quotes.map((quote, index) => (
                                <tr key={index}>
                                    <td>{quote.symbol}</td>
                                    <td style={{ fontWeight: 'bold' }}>{formatPrice(quote.lastPrice)} $</td>
                                    <td>{formatPrice(quote.volume)} $</td>
                                    <td style={{ color: quote.priceChangePercent > 0 ? 'green' : 'red' }}>{round(quote.priceChangePercent)} %</td>
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
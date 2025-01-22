import {useEffect, useState} from "react";
import "./Dashboard.css";
import {Lang} from "../../enumeration/Lang.ts";
import {Quote} from "../api.ts";
import axios from "axios";
import {Symbols} from "../../enumeration/Symbols.ts";

function round(num: number): number {
    return parseFloat(Number(num).toFixed(2));
}

const formatNumber = (num: number): string => {
    return new Intl.NumberFormat(Lang.RU, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(num);
};

const Dashboard = () => {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchQuotes = async (): Promise<void> => {
        try {
            const symbols = Object.values(Symbols);
            const response = await axios.get<Quote[]>("https://api.binance.com/api/v3/ticker/24hr", {
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
        fetchQuotes();

        const interval = setInterval(() => {
            fetchQuotes();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="dashboard">
            <main>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="crypto-table">
                        <thead>
                        <tr>
                            <th>Token</th>
                            <th>Price $</th>
                            <th>Volume $</th>
                            <th>Last 24H %</th>
                        </tr>
                        </thead>
                        <tbody>
                        {quotes.map((quote, index) => (
                            <tr key={index}>
                                <td>{quote.symbol}</td>
                                <td style={{fontWeight: 'bold'}}>{formatNumber(round(quote.lastPrice))} $</td>
                                <td>{formatNumber(round(quote.volume))} $</td>
                                <td style={{color: quote.priceChangePercent > 0 ? 'green' : 'red'}}>{round(quote.priceChangePercent)} %</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
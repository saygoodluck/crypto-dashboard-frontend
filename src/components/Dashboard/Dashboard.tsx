import PairsList from "../PairsList/PairsList";
import SearchTab from "../SearchTab/SearchTab";
import React, {useState, useCallback, useEffect} from "react";
import {SymbolType} from "../../enumeration/Symbols";
import TelegramAuthButton from "../Telegram/TelegramAuthButton.tsx";
import "./Dashboard.css";


const Dashboard: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [username, setUsername] = useState(null);

    const handleSearchChange = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const authToken = params.get('authToken');
        if (authToken) {
            fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/whoami`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `${authToken}`,
                    },
                })
                .then((response) => response.json())
                .then((data) => setUsername(data.username));
        }
    }, []);

    const pairsArray: SymbolType[] | undefined = searchValue ? [searchValue as SymbolType] : undefined;

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <SearchTab onSearchChange={handleSearchChange}/>
                <TelegramAuthButton username={username}/>
            </div>
            <PairsList symbols={pairsArray}/>
        </div>
    )
}
export default Dashboard;
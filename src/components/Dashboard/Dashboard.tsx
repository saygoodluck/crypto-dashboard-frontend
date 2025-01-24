import PairsList from "../PairsList/PairsList";
import SearchTab from "../SearchTab/SearchTab";
import { useState, useCallback } from "react";
import { SymbolType } from "../../enumeration/Symbols";

const Dashboard: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');

    const handleSearchChange = useCallback((value: string) => {
        setSearchValue(value);
    }, []);

    const pairsArray: SymbolType[] | undefined = searchValue ? [searchValue as SymbolType] : undefined;

    return (
        <div className="dashboard">
            <SearchTab onSearchChange={handleSearchChange} />
            <PairsList symbols={pairsArray} />
        </div>
    )
}
export default Dashboard;
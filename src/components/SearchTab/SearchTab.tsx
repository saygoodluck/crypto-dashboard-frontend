import "./SearchTab.css";
import React, { ChangeEvent } from 'react';

interface SearchTabProps {
    onSearchChange: (value: string) => void;
}

const SearchTab: React.FC<SearchTabProps> = ({ onSearchChange }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value.toUpperCase());
    };
    return (
        <div className="search-tab">
            <input
                type="text"
                placeholder="Search"
                onChange={handleChange}
            />
        </div>
    )
}

export default SearchTab;
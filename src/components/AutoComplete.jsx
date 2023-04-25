import React, { useState } from "react";
import './autoComplete.css';

const Autocomplete = () => {
    const [inputValue, setInputValue] = useState("");
    const [searchHistory, setSearchHistory] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const data = [
        "apple",
        "banana",
        "cherry",
        "date",
        "elderberry",
        "fig",
        "grape",
        "kiwi",
        "lemon",
        "mango",
        "orange",
        "peach",
        "pineapple",
        "raspberry",
        "strawberry",
        "tangerine",
        "watermelon",
    ];

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);

        if (value.length > 0) {
            const filteredResults = data.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filteredResults.slice(0, 5));
        } else {
            setSearchResults([]);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        if (inputValue.length > 0) {
            setSearchHistory([inputValue, ...searchHistory.slice(0, 4)]);
            const filteredResults = data.filter((item) =>
                item.toLowerCase().includes(inputValue.toLowerCase())
            );
            setSearchResults(filteredResults.slice(0, 5));
            // setInputValue("");
        } else {
            setInputValue("");
            setSearchResults([]);
        }
    };

    const handleClear = () => {
        setInputValue("");
        setSearchResults([]);
    };

    const getHighlightedText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return <span> {parts.map((part, i) =>
            <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { fontWeight: 'bold', color: '#0077cc' } : {}}>
                {part}
            </span>)
        } </span>;
    }

    return (
        <div className="autocomplete-container">
            <form className="autocomplete-form" onSubmit={handleSearch}>
                <input
                    className="autocomplete-input"
                    type="text"
                    placeholder="Search"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button className="autocomplete-button" type="submit">Search</button>
                <button className="autocomplete-clear-button" type="button" onClick={handleClear}>
                    Clear
                </button>
            </form>
            <div className="autocomplete-results">
                {searchResults.length > 0 && (
                    <ul>
                        {searchResults.map((result, index) => (
                            <li key={index}>
                                {getHighlightedText(result, inputValue)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {searchHistory.length > 0 && (
                <div className="autocomplete-history">
                    <p>Search History</p>
                    <ul>
                        {searchHistory.map((history, index) => (
                            <li key={index}>{history}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Autocomplete;

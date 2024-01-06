import React, { useState, useEffect } from 'react';
import countryData from '../../resources/countryData.json';

function TextBox() {
  const [val, setVal] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const changeInput = (e) => {
    const inputText = e.target.value;
    setVal(inputText);
    setSuggestions(getSuggestions(inputText));
    setShowSuggestions(true);
  };

  const handleEscapeKey = (e) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const searchButton = () => {
    setShowSuggestions(true);
  };

  const getSuggestions = (inputText) => {
    return countryData.filter((country) =>
      country.name.toLowerCase().includes(inputText.toLowerCase())
    );
  };

  useEffect(() => {
    const handleEscapeKeyDocument = (e) => {
      if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKeyDocument);
    return () => {
      document.removeEventListener('keydown', handleEscapeKeyDocument);
    };
  }, []);

  return (
    <div className="main">
      <h1 className="head">Search any country</h1>
      <div className="box">
        <input type="text" onChange={changeInput} />
        <button className="search" onClick={searchButton}>
          Search
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="results">
          <ul className="suggestions">
            {suggestions.map((country, index) => (
              <li key={index}>{country.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TextBox;

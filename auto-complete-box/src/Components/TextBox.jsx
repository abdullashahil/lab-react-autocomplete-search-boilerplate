import React, { useState } from 'react';
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

  return (
    <div className="main">
      <h1 className="head">Search any country</h1>
      <div className="box">
        <input type="text" onChange={changeInput} onKeyDown={handleEscapeKey}/>
        <button className="search" onClick={searchButton}>Search</button>
      </div>

      <div className="results">{showSuggestions && (
        <ul className="suggestions">
          {suggestions.map((country, index) => (
            <li key={index}>{country.name}</li>
          ))}
        </ul>
      )}</div>

      {/* <h1>{val}</h1> */}
    </div>
  );
}

export default TextBox;
3
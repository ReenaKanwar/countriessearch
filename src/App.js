import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched countries:", data);
        setCountries(data);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search for countries..."
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <h3>Total countries: {filteredCountries.length}</h3>

      <div className="countries-grid">
        {filteredCountries.map((country) => (
          <div className="country-card" key={country.cca3}>
            <img
              src={country.flags?.png || country.flags?.svg}
              alt={`${country.name.common} flag`}
              className="country-flag"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150?text=No+Flag";
              }}
            />
            <p className="country-name">{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

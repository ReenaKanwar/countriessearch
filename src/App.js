import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        console.log("Fetched countries:", data);
        setCountries(data);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error); 
        setError("Failed to load countries.");
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name?.common?.toLowerCase().includes(searchQuery.toLowerCase())
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

      {error && <p className="error">{error}</p>} 

      <h3>Total countries: {filteredCountries.length}</h3>

      <div className="countries-grid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div className="country-card" key={country.cca3}>
              <img
                src={country.flags?.png || "https://via.placeholder.com/150?text=No+Flag"}
                alt={`${country.name?.common || "Unknown"} flag`}
                className="country-flag"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150?text=No+Flag";
                }}
              />
              <p className="country-name">{country.name?.common || "Unknown"}</p>
            </div>
          ))
        ) : (
          <p>No countries found</p> 
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./App.css";
 
function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);
 
  useEffect(() => {
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then((res) => {
        if (!res.ok) throw new Error("API Error");
        return res.json();
      })
      .then((data) => {
        setCountries(data);
        console.log("Countries fetched:", data);
      })
      .catch((err) => {
        console.error("Error fetching countries:", err);
        setError(true);
      });
  }, []);
 
  const filteredCountries = countries.filter((country) =>
    country.common?.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
 
      {error ? (
        <p className="error">Failed to load countries.</p>
      ) : (
        <>
          <h3>Total countries: {filteredCountries.length}</h3>
 
          <div className="countries-grid">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div className="countryCard" key={country.common}>
                  <img
                    className="country-flag"
                    src={country.png || "https://via.placeholder.com/150?text=No+Flag"}
                    alt={`${country.common || "No name"} flag`}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150?text=No+Flag")
                    }
                  />
                  <p className="country-name">{country.common || "Unknown"}</p>
                </div>
              ))
            ) : (
              <p>No countries found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
 
export default App;
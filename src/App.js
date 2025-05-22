import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(false);

  
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
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
    country.name?.common?.toLowerCase().includes(searchQuery.toLowerCase())
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
                <div className="country-card" key={country.cca3}>
                  <img
                    className="country-flag"
                    src={
                      country.flags?.png ||
                      country.flags?.svg ||
                      "https://via.placeholder.com/150?text=No+Flag"
                    }
                    alt={`${country.name?.common || "No name"} flag`}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/150?text=No+Flag")
                    }
                  />
                  <p className="country-name">
                    {country.name?.common || "Unknown"}
                  </p>
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

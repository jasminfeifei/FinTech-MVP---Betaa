import React, { useState } from "react";
import Select from "react-select";

// Helper: level字符串排序
const levelOrder = [
  "Beginner", "3A", "3A+", "3B", "3B+", "3C", "3C+",
  "4A", "4A+", "4B", "4B+", "4C", "4C+",
  "5A", "5A+", "5B", "5B+", "5C", "5C+",
  "6A", "6A+", "6B", "6B+", "6C", "6C+",
  "7A", "7A+"
];

const MentorFilter = ({ mentors, onFilter, onLogout }) => {
  // Collect options
  const allLevels = Array.from(new Set(mentors.map(m => m.level)))
    .filter(Boolean)
    .sort((a, b) => levelOrder.indexOf(a) - levelOrder.indexOf(b));
  const allCities = Array.from(new Set(mentors.map(m => m.city))).filter(Boolean).sort();
  const allLocations = Array.from(new Set(mentors.map(m => m.location))).filter(Boolean).sort();

  // States
  const [gender, setGender] = useState(null);
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [minScore, setMinScore] = useState("");
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Multi-select options
  const levelOptions = allLevels.map(lvl => ({ value: lvl, label: lvl }));
  const cityOptions = allCities.map(city => ({ value: city, label: city }));
  const locationOptions = allLocations.map(loc => ({ value: loc, label: loc }));

  // For Select placeholder
  const multiSelectStyle = {
    control: (base) => ({
      ...base,
      minHeight: "36px",
      background: "#192849",
      borderColor: "#4567a6",
      color: "#fff",
      boxShadow: "none"
    }),
    menu: (base) => ({
      ...base,
      background: "#273c6a",
      color: "#fff"
    }),
    multiValue: (base) => ({
      ...base,
      background: "#2b4176",
      color: "#fff"
    }),
    singleValue: (base) => ({
      ...base,
      color: "#fff"
    }),
    option: (base, { isFocused }) => ({
      ...base,
      background: isFocused ? "#3e60a1" : "#273c6a",
      color: "#fff",
      cursor: "pointer"
    })
  };

  const handleFilter = () => {
    onFilter({
      gender: gender || "",
      minAge,
      maxAge,
      levelList: selectedLevels.map(l => l.value),
      minScore,
      cityList: selectedCities.map(c => c.value),
      locationList: selectedLocations.map(l => l.value),
      minPrice,
      maxPrice
    });
  };

  // -- UI --
  return (
    <div style={{
      maxWidth: 600,
      margin: "40px auto",
      padding: 36,
      borderRadius: 18,
      background: "linear-gradient(135deg, #14203e 70%, #264385 100%)",
      boxShadow: "0 8px 32px #11204644",
      color: "#fff"
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: 36,
        fontWeight: 700,
        letterSpacing: 1,
        color: "#6bb8ff",
        textShadow: "0 2px 14px #0008"
      }}>
        Find Your Mentor
      </h2>
      <div style={{
        display: "grid",
        gap: 22,
        fontSize: 17,
        marginBottom: 24
      }}>
        <div>
          <label style={{ width: 120, display: "inline-block" }}>Gender:</label>
          <select
            value={gender || ""}
            onChange={e => setGender(e.target.value || null)}
            style={{
              minWidth: 120,
              padding: "7px",
              borderRadius: 7,
              border: "1px solid #4567a6",
              background: "#192849",
              color: "#fff"
            }}
          >
            <option value="">No preference</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label style={{ width: 120, display: "inline-block" }}>Age:</label>
          <input
            type="number"
            min="18"
            max="80"
            value={minAge}
            onChange={e => setMinAge(e.target.value)}
            placeholder="Min"
            style={{
              width: 64, marginRight: 10, borderRadius: 6, border: "1px solid #4567a6", background: "#192849", color: "#fff", padding: 6
            }}
          />
          -
          <input
            type="number"
            min="18"
            max="80"
            value={maxAge}
            onChange={e => setMaxAge(e.target.value)}
            placeholder="Max"
            style={{
              width: 64, marginLeft: 10, borderRadius: 6, border: "1px solid #4567a6", background: "#192849", color: "#fff", padding: 6
            }}
          />
        </div>
        <div>
          <label style={{ width: 120, display: "inline-block" }}>Level(s):</label>
          <Select
            options={levelOptions}
            isMulti
            placeholder="No preference"
            styles={multiSelectStyle}
            value={selectedLevels}
            onChange={setSelectedLevels}
          />
        </div>
        <div>
          <label style={{ width: 120, display: "inline-block" }}>Score ≥</label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="5"
            value={minScore}
            onChange={e => setMinScore(e.target.value)}
            placeholder="No preference"
            style={{
              width: 80, borderRadius: 6, border: "1px solid #4567a6", background: "#192849", color: "#fff", padding: 6
            }}
          />
        </div>
        <div>
          <label style={{ width: 120, display: "inline-block" }}>City:</label>
          <Select
            options={cityOptions}
            isMulti
            placeholder="No preference"
            styles={multiSelectStyle}
            value={selectedCities}
            onChange={setSelectedCities}
          />
        </div>
        <div>
          <label style={{ width: 120, display: "inline-block" }}>Location:</label>
          <Select
            options={locationOptions}
            isMulti
            placeholder="No preference"
            styles={multiSelectStyle}
            value={selectedLocations}
            onChange={setSelectedLocations}
          />
        </div>
        <div>
          <label style={{ width: 120, display: "inline-block" }}>Ask Price:</label>
          <input
            type="number"
            min="0"
            value={minPrice}
            onChange={e => setMinPrice(e.target.value)}
            placeholder="Min"
            style={{
              width: 64, marginRight: 10, borderRadius: 6, border: "1px solid #4567a6", background: "#192849", color: "#fff", padding: 6
            }}
          />
          -
          <input
            type="number"
            min="0"
            value={maxPrice}
            onChange={e => setMaxPrice(e.target.value)}
            placeholder="Max"
            style={{
              width: 64, marginLeft: 10, borderRadius: 6, border: "1px solid #4567a6", background: "#192849", color: "#fff", padding: 6
            }}
          />
        </div>
      </div>
      <div style={{ marginTop: 30, textAlign: "center" }}>
        <button
          onClick={handleFilter}
          style={{
            padding: "10px 44px",
            background: "linear-gradient(90deg, #37aeea 40%, #004e9a 100%)",
            color: "#fff",
            fontWeight: 700,
            border: "none",
            borderRadius: 9,
            fontSize: 18,
            boxShadow: "0 2px 8px #0a174430",
            marginRight: 32,
            cursor: "pointer",
            letterSpacing: 1,
            transition: "background 0.2s"
          }}
        >
          Filter
        </button>
        <button
          onClick={onLogout}
          style={{
            padding: "10px 24px",
            background: "#26304a",
            color: "#fff",
            border: "none",
            borderRadius: 9,
            fontSize: 16,
            fontWeight: 500,
            cursor: "pointer",
            letterSpacing: 1,
            transition: "background 0.2s"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default MentorFilter;



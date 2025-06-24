import React, { useState } from "react";

const SessionConfirm = ({ session, novice, onConfirm }) => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const handleConfirm = () => {
    if (!date || !location) {
      alert("Please select date and location!");
      return;
    }
    onConfirm({ ...session, date, location, status: "confirmed" });
  };

  return (
    <div style={{
      maxWidth: 460,
      margin: "60px auto",
      padding: 36,
      borderRadius: 20,
      background: "linear-gradient(135deg, #14203e 70%, #264385 100%)",
      boxShadow: "0 8px 32px #11204644",
      color: "#fff"
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: 28,
        fontWeight: 700,
        color: "#6bb8ff",
        letterSpacing: 1,
        textShadow: "0 2px 14px #0006"
      }}>
        Session Confirmation
      </h2>
      <div style={{
        background: "#16204a",
        borderRadius: 10,
        padding: "18px 20px",
        marginBottom: 20
      }}>
        <div style={{ fontWeight: 700, fontSize: 18 }}>
          BetaBucks to receive: <span style={{ color: "#ffe249" }}>{session.price}</span>
        </div>
        <div style={{ marginTop: 10, fontSize: 16 }}>
          <div><strong>Novice:</strong> {novice?.name}</div>
          <div><strong>Level:</strong> {novice?.level}</div>
          <div><strong>City:</strong> {novice?.city}</div>
        </div>
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{
          width: 110,
          display: "inline-block",
          fontSize: 17
        }}>Date:</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: 7,
            border: "1.5px solid #4567a6",
            background: "#192849",
            color: "#fff",
            fontSize: 16
          }}
        />
      </div>
      <div style={{ marginBottom: 22 }}>
        <label style={{
          width: 110,
          display: "inline-block",
          fontSize: 17
        }}>Location:</label>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="Enter location"
          style={{
            padding: "8px 12px",
            borderRadius: 7,
            border: "1.5px solid #4567a6",
            background: "#192849",
            color: "#fff",
            fontSize: 16
          }}
        />
      </div>
      <button
        onClick={handleConfirm}
        style={{
          margin: "18px 0 0 0",
          width: "100%",
          padding: "13px 0",
          background: "linear-gradient(90deg, #37aeea 40%, #004e9a 100%)",
          color: "#fff",
          fontWeight: 800,
          border: "none",
          borderRadius: 11,
          fontSize: 18,
          letterSpacing: 1,
          boxShadow: "0 2px 12px #0a174450",
          cursor: "pointer",
          transition: "background 0.18s"
        }}
      >
        Confirm Reservation
      </button>
    </div>
  );
};

export default SessionConfirm;

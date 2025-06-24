import React from "react";

const BetaBucks = ({ user }) => {
  return (
    <div style={{
      position: "fixed",
      top: 24,
      right: 40,
      background: "linear-gradient(90deg, #114489 60%, #37aeea 100%)",
      color: "#fff",
      padding: "10px 26px",
      borderRadius: 17,
      fontSize: 18,
      fontWeight: 700,
      letterSpacing: 1,
      boxShadow: "0 4px 16px #0002"
    }}>
      BetaBucks: <span style={{ color: "#ffe249", marginLeft: 6 }}>{user?.BetaBucksBalance ?? 0}</span>
    </div>
  );
};

export default BetaBucks;

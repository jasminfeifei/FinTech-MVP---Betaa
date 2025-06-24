import React from "react";

const ConfirmInviteModal = ({ mentor, user, onConfirm, onCancel }) => {
  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(10,18,40,0.78)", zIndex: 1001,
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "linear-gradient(135deg, #14203e 70%, #264385 100%)",
        borderRadius: 18,
        padding: "38px 36px 28px 36px",
        color: "#fff",
        minWidth: 340,
        boxShadow: "0 8px 32px #11204644"
      }}>
        <h3 style={{
          textAlign: "center", color: "#6bb8ff", fontWeight: 700, marginBottom: 22, letterSpacing: 1
        }}>
          Confirm Invitation
        </h3>
        <div style={{ marginBottom: 20, fontSize: 18 }}>
          <strong>Mentor:</strong> {mentor.name} <br />
          <strong>Level:</strong> {mentor.level} <br />
          <strong>Ask Price:</strong> <span style={{ color: "#ffe249" }}>{mentor.ask_price ?? "-"}</span> BetaBucks <br />
          <strong>Your BetaBucks:</strong> <span style={{ color: "#ffe249" }}>{user.BetaBucksBalance ?? 0}</span>
        </div>
        <div style={{ display: "flex", gap: 18, justifyContent: "center" }}>
          <button
            onClick={onConfirm}
            style={{
              padding: "9px 38px",
              background: "linear-gradient(90deg, #37aeea 40%, #004e9a 100%)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 17,
              cursor: "pointer"
            }}
          >Confirm</button>
          <button
            onClick={onCancel}
            style={{
              padding: "9px 22px",
              background: "#192849",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer"
            }}
          >Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmInviteModal;

import React, { useState } from "react";

const Login = ({ users, onLogin }) => {
  const [role, setRole] = useState("novice");
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // 验证用户ID是否存在于选定身份的用户组
    let user = users.find(
      u => u.position === role && String(u.id) === userId
    );
    if (!user) {
      setError("User ID not found for this role!");
      return;
    }
    setError("");
    onLogin(user);
  };

  return (
    <div style={{
      maxWidth: 420,
      margin: "90px auto 0 auto",
      padding: "44px 32px 40px 32px",
      borderRadius: 20,
      background: "linear-gradient(135deg, #14203e 70%, #264385 100%)",
      boxShadow: "0 8px 32px #11204644",
      color: "#fff"
    }}>
      <h1 style={{
        textAlign: "center",
        fontWeight: 900,
        fontSize: 28,
        color: "#6bb8ff",
        letterSpacing: 2,
        textShadow: "0 2px 18px #0006",
        marginBottom: 38
      }}>
        BetaChain Login
      </h1>
      <div style={{ display: "grid", gap: 28 }}>
        <div>
          <label style={{
            fontSize: 17,
            width: 128,
            display: "inline-block"
          }}>Who you are:</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{
              minWidth: 120,
              padding: "9px",
              borderRadius: 7,
              border: "1.5px solid #4567a6",
              background: "#192849",
              color: "#fff",
              fontSize: 16
            }}
          >
            <option value="novice">Novice</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>
        <div>
          <label style={{
            fontSize: 17,
            width: 128,
            display: "inline-block"
          }}>User ID:</label>
          <input
            type="number"
            value={userId}
            placeholder="Enter your ID"
            onChange={e => setUserId(e.target.value)}
            style={{
              minWidth: 120,
              padding: "9px",
              borderRadius: 7,
              border: "1.5px solid #4567a6",
              background: "#192849",
              color: "#fff",
              fontSize: 16
            }}
          />
        </div>
      </div>
      {error &&
        <div style={{
          color: "#ff6289",
          marginTop: 18,
          marginBottom: 6,
          fontSize: 15,
          fontWeight: 600,
          textAlign: "center"
        }}>{error}</div>
      }
      <button
        onClick={handleLogin}
        style={{
          margin: "36px 0 0 0",
          width: "100%",
          padding: "12px 0",
          background: "linear-gradient(90deg, #37aeea 40%, #004e9a 100%)",
          color: "#fff",
          fontWeight: 800,
          border: "none",
          borderRadius: 11,
          fontSize: 18,
          letterSpacing: 2,
          boxShadow: "0 2px 12px #0a174450",
          cursor: "pointer",
          transition: "background 0.18s"
        }}
        onMouseOver={e => e.currentTarget.style.background = "linear-gradient(90deg, #3fd1e8 40%, #276cc1 100%)"}
        onMouseOut={e => e.currentTarget.style.background = "linear-gradient(90deg, #37aeea 40%, #004e9a 100%)"}
      >
        Login
      </button>
      <div style={{
        fontSize: 13,
        color: "#acd7ffcc",
        marginTop: 22,
        textAlign: "center"
      }}>
        Try a Novice ID (e.g. 1) or Mentor ID (e.g. 1001) based on your user data.
      </div>
    </div>
  );
};

export default Login;

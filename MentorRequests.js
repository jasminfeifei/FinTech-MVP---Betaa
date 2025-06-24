import React from "react";

const MentorRequests = ({ requests, users, onAccept, onReject }) => {
  return (
    <div style={{
      maxWidth: 800,
      margin: "50px auto",
      padding: "36px 32px",
      borderRadius: 20,
      background: "linear-gradient(135deg, #14203e 70%, #264385 100%)",
      boxShadow: "0 8px 32px #11204644",
      color: "#fff"
    }}>
      <h2 style={{
        textAlign: "center",
        color: "#6bb8ff",
        marginBottom: 32,
        letterSpacing: 1,
        textShadow: "0 2px 14px #0007"
      }}>Mentor Requests</h2>
      {requests.length === 0 ? (
        <div style={{
          textAlign: "center",
          color: "#ddd",
          fontSize: 18,
          marginTop: 40
        }}>No requests received yet.</div>
      ) : (
        <table style={{
          width: "100%",
          background: "#17224a",
          borderCollapse: "separate",
          borderSpacing: 0,
          borderRadius: 12,
          boxShadow: "0 2px 12px #01143030"
        }}>
          <thead>
            <tr style={{ background: "#19326e" }}>
              <th style={th}>Novice</th>
              <th style={th}>Level</th>
              <th style={th}>City</th>
              <th style={th}>Ask Price</th>
              <th style={th}>Status</th>
              <th style={th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => {
              const novice = users.find(u => u.id === req.noviceId);
              return (
                <tr key={req.id}>
                  <td style={td}>{novice ? novice.name : "Unknown"}</td>
                  <td style={td}>{novice ? novice.level : "-"}</td>
                  <td style={td}>{novice ? novice.city : "-"}</td>
                  <td style={td}>{req.price ?? "-"}</td>
                  <td style={td}>{req.status}</td>
                  <td style={td}>
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() => onAccept(req.id)}
                          style={actionBtn}
                        >Accept</button>
                        <button
                          onClick={() => onReject(req.id)}
                          style={{ ...actionBtn, background: "#d43b6c", marginLeft: 12 }}
                        >Reject</button>
                      </>
                    )}
                    {req.status !== "pending" && <span>-</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

const th = {
  padding: "12px 10px",
  color: "#6bb8ff",
  fontWeight: 700,
  borderBottom: "2px solid #325396"
};
const td = {
  padding: "11px 8px",
  borderBottom: "1px solid #223356",
  color: "#fff",
  fontSize: 16,
  textAlign: "center"
};
const actionBtn = {
  padding: "7px 22px",
  background: "linear-gradient(90deg, #37aeea 40%, #004e9a 100%)",
  color: "#fff",
  fontWeight: 700,
  border: "none",
  borderRadius: 7,
  fontSize: 15,
  cursor: "pointer",
  boxShadow: "0 2px 6px #00112260",
  transition: "background 0.18s"
};

export default MentorRequests;

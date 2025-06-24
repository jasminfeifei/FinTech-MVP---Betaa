import React, { useState } from "react";
import ConfirmInviteModal from "./ConfirmInviteModal";

const MentorList = ({ mentors, user, onInvite, onBack }) => {
  const [selectedMentor, setSelectedMentor] = useState(null);

  // 自动获取所有mentor对象里有的字段，作为表头
  const allKeys = mentors.length
    ? Array.from(
        new Set(
          mentors.reduce((arr, m) => arr.concat(Object.keys(m)), [])
        )
      )
    : [];

  // 你可以定制显示顺序或增删字段
  const displayOrder = [
    "name", "gender", "age", "level", "score",
    "city", "location", "ask_price", "BetaBucksBalance", "position"
  ];
  const columns = displayOrder.filter(col => allKeys.includes(col)).concat(
    allKeys.filter(col => !displayOrder.includes(col))
  );

  return (
    <div style={{
      maxWidth: 1100,
      margin: "60px auto 0 auto",
      padding: "36px 34px",
      borderRadius: 20,
      background: "linear-gradient(135deg, #14203e 70%, #264385 100%)",
      boxShadow: "0 8px 32px #11204644",
      color: "#fff"
    }}>
      <h2 style={{
        textAlign: "center",
        color: "#6bb8ff",
        fontWeight: 800,
        marginBottom: 34,
        letterSpacing: 1,
        textShadow: "0 2px 14px #0008"
      }}>Mentor List</h2>
      {mentors.length === 0 ? (
        <div style={{
          textAlign: "center",
          fontSize: 19,
          color: "#abd7ff",
          margin: "50px 0"
        }}>
          No mentors found matching your criteria.<br />
          <button
            onClick={onBack}
            style={{
              marginTop: 28,
              padding: "10px 32px",
              borderRadius: 8,
              background: "linear-gradient(90deg, #37aeea 40%, #004e9a 100%)",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: 1,
              cursor: "pointer"
            }}
          >Back to Filter</button>
        </div>
      ) : (
        <>
          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              background: "#17224a",
              borderCollapse: "separate",
              borderSpacing: 0,
              borderRadius: 12,
              boxShadow: "0 2px 12px #01143030",
              marginBottom: 24
            }}>
              <thead>
                <tr style={{ background: "#19326e" }}>
                  {columns.map(col => (
                    <th key={col} style={th}>
                      {col.replace(/_/g, " ").replace(/\b\w/g, x => x.toUpperCase())}
                    </th>
                  ))}
                  <th style={th}>Action</th>
                </tr>
              </thead>
              <tbody>
                {mentors.map(m => (
                  <tr key={m.id}>
                    {columns.map(col => (
                      <td key={col} style={td}>{m[col]}</td>
                    ))}
                    <td style={td}>
                      <button
                        disabled={user.BetaBucksBalance < (m.ask_price ?? 0)}
                        onClick={() => setSelectedMentor(m)}
                        style={{
                          ...inviteBtn,
                          background: user.BetaBucksBalance < (m.ask_price ?? 0)
                            ? "#6d7689"
                            : "linear-gradient(90deg, #37aeea 40%, #004e9a 100%)",
                          cursor: user.BetaBucksBalance < (m.ask_price ?? 0) ? "not-allowed" : "pointer"
                        }}
                      >
                        {user.BetaBucksBalance < (m.ask_price ?? 0) ? "Insufficient BetaBucks" : "Invite"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: "center", marginTop: 12 }}>
            <button
              onClick={onBack}
              style={{
                padding: "10px 32px",
                borderRadius: 8,
                background: "#26304a",
                color: "#fff",
                border: "none",
                fontWeight: 700,
                fontSize: 16,
                cursor: "pointer",
                marginTop: 5
              }}
            >Back to Filter</button>
          </div>
          {selectedMentor &&
            <ConfirmInviteModal
              mentor={selectedMentor}
              user={user}
              onConfirm={() => { onInvite(selectedMentor.id); setSelectedMentor(null); }}
              onCancel={() => setSelectedMentor(null)}
            />
          }
        </>
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
const inviteBtn = {
  padding: "8px 24px",
  background: "linear-gradient(90deg, #37aeea 40%, #004e9a 100%)",
  color: "#fff",
  fontWeight: 700,
  border: "none",
  borderRadius: 7,
  fontSize: 15,
  cursor: "pointer",
  boxShadow: "0 2px 8px #00112240",
  letterSpacing: 1
};

export default MentorList;

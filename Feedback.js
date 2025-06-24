import React, { useState } from "react";

const Feedback = ({ mentorName, onSubmit }) => {
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment) {
      alert("Please enter your feedback!");
      return;
    }
    onSubmit({ score, comment });
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: "60px auto",
      padding: 34,
      borderRadius: 17,
      background: "linear-gradient(135deg, #14203e 70%, #264385 100%)",
      boxShadow: "0 8px 32px #11204644",
      color: "#fff"
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: 22,
        color: "#6bb8ff",
        fontWeight: 700,
        textShadow: "0 2px 14px #0008"
      }}>
        Rate Mentor: {mentorName}
      </h2>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600 }}>Rating: </label>
        <select
          value={score}
          onChange={e => setScore(Number(e.target.value))}
          style={{
            marginLeft: 12,
            padding: "5px 18px",
            background: "#192849",
            color: "#fff",
            border: "1.5px solid #4567a6",
            borderRadius: 7,
            fontSize: 16
          }}
        >
          {[5, 4, 3, 2, 1].map(num => (
            <option key={num} value={num}>{num} Stars</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: 18 }}>
        <label style={{ fontWeight: 600 }}>Comment: </label>
        <textarea
          rows={3}
          style={{ width: "100%", borderRadius: 7, border: "1.5px solid #4567a6", background: "#192849", color: "#fff", padding: 8, fontSize: 16 }}
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
      </div>
      <button
        onClick={handleSubmit}
        style={{
          width: "100%",
          padding: "12px 0",
          background: "linear-gradient(90deg, #37aeea 40%, #004e9a 100%)",
          color: "#fff",
          fontWeight: 700,
          border: "none",
          borderRadius: 11,
          fontSize: 17,
          boxShadow: "0 2px 10px #0a174430",
          cursor: "pointer"
        }}
      >
        Submit Feedback
      </button>
    </div>
  );
};

export default Feedback;

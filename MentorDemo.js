import React, { useState } from "react";

// 假数据
const mentor = { id: 1011, name: "Mentor1011", BetaBucksBalance: 700 };
const novice = { id: 1001, name: "Novice0001", BetaBucksBalance: 300 };
const request = { id: 1, noviceId: 1001, mentorId: 1011, price: 133, status: "pending" };

export default function MentorDemo() {
  // 状态
  const [stage, setStage] = useState("invitation"); // invitation/session/finished/feedback
  const [mentorState, setMentorState] = useState({ ...mentor });
  const [sessionInfo, setSessionInfo] = useState({ date: "", location: "" });
  const [feedback, setFeedback] = useState({ score: 5, comment: "" });

  // 接受邀请
  const handleAccept = () => setStage("session");
  // 拒绝
  const handleReject = () => setStage("rejected");
  // session确认
  const handleSessionConfirm = () => {
    if (!sessionInfo.date || !sessionInfo.location) {
      alert("Please pick date and location!");
      return;
    }
    setStage("finished");
    // 收到BetaBucks
    setMentorState(ms => ({
      ...ms,
      BetaBucksBalance: ms.BetaBucksBalance + request.price
    }));
  };
  // 反馈
  const handleFeedback = () => {
    if (!feedback.comment) {
      alert("Please leave your feedback!");
      return;
    }
    alert(`Feedback submitted!\nScore: ${feedback.score} stars\nComment: ${feedback.comment}`);
    setStage("done");
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: "70px auto",
      padding: 34,
      borderRadius: 17,
      background: "linear-gradient(135deg, #14203e 70%, #264385 100%)",
      boxShadow: "0 8px 32px #11204644",
      color: "#fff"
    }}>
      <h2 style={{
        textAlign: "center",
        marginBottom: 24,
        color: "#6bb8ff",
        fontWeight: 800,
        textShadow: "0 2px 14px #0008"
      }}>
        Mentor Dashboard (ID: 1011)
      </h2>
      <div style={{
        position: "absolute",
        top: 18, right: 48,
        background: "linear-gradient(90deg, #114489 60%, #37aeea 100%)",
        color: "#fff",
        padding: "7px 18px",
        borderRadius: 17,
        fontSize: 17,
        fontWeight: 700,
        letterSpacing: 1,
        boxShadow: "0 4px 16px #0002"
      }}>
        BetaBucks: <span style={{ color: "#ffe249", marginLeft: 6 }}>{mentorState.BetaBucksBalance}</span>
      </div>

      {stage === "invitation" && (
        <div>
          <div style={{ fontSize: 19, marginBottom: 16 }}>
            <b>Invitation from:</b> Novice0001 (ID: 1001)
          </div>
          <div style={{ marginBottom: 10 }}>
            <b>BetaBucks to receive:</b> <span style={{ color: "#ffe249" }}>133</span>
          </div>
          <button
            style={actionBtn}
            onClick={handleAccept}
          >Accept</button>
          <button
            style={{ ...actionBtn, background: "#d43b6c", marginLeft: 16 }}
            onClick={handleReject}
          >Reject</button>
        </div>
      )}

      {stage === "session" && (
        <div>
          <div style={{ fontSize: 17, marginBottom: 20 }}>
            <b>Set Training Session</b><br />
            (Mentor: {mentorState.name} | Novice: {novice.name})
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ width: 92, display: "inline-block" }}>Date:</label>
            <input
              type="date"
              value={sessionInfo.date}
              onChange={e => setSessionInfo({ ...sessionInfo, date: e.target.value })}
              style={input}
            />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ width: 92, display: "inline-block" }}>Location:</label>
            <input
              type="text"
              placeholder="Enter location"
              value={sessionInfo.location}
              onChange={e => setSessionInfo({ ...sessionInfo, location: e.target.value })}
              style={input}
            />
          </div>
          <button
            style={{ ...actionBtn, width: "100%" }}
            onClick={handleSessionConfirm}
          >Session Finished</button>
        </div>
      )}

      {stage === "finished" && (
        <div>
          <div style={{ fontSize: 17, marginBottom: 16, color: "#ffe249" }}>
            +133 BetaBucks received!
          </div>
          <div style={{ fontSize: 16, marginBottom: 22 }}>
            Please give feedback to Novice0001:
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Score:&nbsp;</label>
            <select
              value={feedback.score}
              onChange={e => setFeedback(f => ({ ...f, score: Number(e.target.value) }))}
              style={input}
            >
              {[5, 4, 3, 2, 1].map(num => (
                <option key={num} value={num}>{num} Stars</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label>Comment:&nbsp;</label>
            <textarea
              rows={3}
              style={{ width: "100%", borderRadius: 7, border: "1.5px solid #4567a6", background: "#192849", color: "#fff", padding: 8, fontSize: 16 }}
              value={feedback.comment}
              onChange={e => setFeedback(f => ({ ...f, comment: e.target.value }))}
            />
          </div>
          <button
            style={{ ...actionBtn, width: "100%" }}
            onClick={handleFeedback}
          >Submit Feedback</button>
        </div>
      )}

      {stage === "done" && (
        <div style={{ color: "#93f988", fontSize: 19, marginTop: 44, textAlign: "center" }}>
          Feedback submitted!<br />All steps finished.<br />BetaBucks: <b>{mentorState.BetaBucksBalance}</b>
        </div>
      )}

      {stage === "rejected" && (
        <div style={{ color: "#ff7a7a", fontSize: 18, marginTop: 44, textAlign: "center" }}>
          You have rejected this invitation.<br />No session scheduled.
        </div>
      )}
    </div>
  );
}

const actionBtn = {
  padding: "10px 28px",
  background: "linear-gradient(90deg, #37aeea 40%, #004e9a 100%)",
  color: "#fff",
  fontWeight: 700,
  border: "none",
  borderRadius: 8,
  fontSize: 17,
  cursor: "pointer",
  boxShadow: "0 2px 8px #00112240",
  letterSpacing: 1
};
const input = {
  minWidth: 130,
  padding: "7px 10px",
  borderRadius: 7,
  border: "1.5px solid #4567a6",
  background: "#192849",
  color: "#fff",
  fontSize: 16
};

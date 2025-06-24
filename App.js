import React, { useState } from "react";
import { users as allUsers } from "./mock/mockData";
import Login from "./components/Login";
import MentorFilter from "./components/MentorFilter";
import MentorList from "./components/MentorList";
import MentorRequests from "./components/MentorRequests";
import SessionConfirm from "./components/SessionConfirm";
import Feedback from "./components/Feedback";
import BetaBucks from "./components/BetaBucks";
import ConfirmInviteModal from "./components/ConfirmInviteModal";

const getAllMentors = users => users.filter(u => u.position === "mentor");

function App() {
  // 全局状态
  const [page, setPage] = useState("login");
  const [users, setUsers] = useState(JSON.parse(JSON.stringify(allUsers)));
  const [currentUser, setCurrentUser] = useState(null);
  const [mentorRequests, setMentorRequests] = useState([]); // 全部请求
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [inviteMentor, setInviteMentor] = useState(null); // 当前邀请弹窗
  const [currentSession, setCurrentSession] = useState(null); // 当前正在处理的session
  const [feedbacks, setFeedbacks] = useState([]);

  // 登录
  const handleLogin = user => {
    setCurrentUser(user);
    setPage(user.position === "novice" ? "mentorFilter" : "mentorRequests");
  };

  // 登出
  const handleLogout = () => {
    setCurrentUser(null);
    setFilteredMentors([]);
    setPage("login");
  };

  // 筛选mentor
  const handleFilterMentors = filters => {
    let mentors = getAllMentors(users);
    if (filters.gender) mentors = mentors.filter(m => m.gender === filters.gender);
    if (filters.minAge) mentors = mentors.filter(m => m.age >= Number(filters.minAge));
    if (filters.maxAge) mentors = mentors.filter(m => m.age <= Number(filters.maxAge));
    if (filters.levelList && filters.levelList.length > 0)
      mentors = mentors.filter(m => filters.levelList.includes(m.level));
    if (filters.minScore) mentors = mentors.filter(m => m.score >= parseFloat(filters.minScore));
    if (filters.cityList && filters.cityList.length > 0)
      mentors = mentors.filter(m => filters.cityList.includes(m.city));
    if (filters.locationList && filters.locationList.length > 0)
      mentors = mentors.filter(m => filters.locationList.includes(m.location));
    if (filters.minPrice) mentors = mentors.filter(m => (m.ask_price || 0) >= parseInt(filters.minPrice));
    if (filters.maxPrice) mentors = mentors.filter(m => (m.ask_price || 0) <= parseInt(filters.maxPrice));
    setFilteredMentors(mentors);
    setPage("mentorList");
  };

  // novice点击invite mentor，弹窗确认
  const handleInvite = mentor => {
    setInviteMentor(mentor);
  };

  // 确认invite，先扣款，发请求
  const handleConfirmInvite = mentor => {
    const novice = users.find(u => u.id === currentUser.id);
    const price = mentor.ask_price ?? 0;
    if ((novice.BetaBucksBalance ?? 0) < price) {
      alert("Not enough BetaBucksBalance!");
      setInviteMentor(null);
      return;
    }
    // 先扣掉BetaBucksBalance
    novice.BetaBucksBalance -= price;
    setUsers([...users]);
    // 创建请求
    const newRequest = {
      id: mentorRequests.length + 1,
      noviceId: currentUser.id,
      mentorId: mentor.id,
      status: "pending",
      price
    };
    setMentorRequests([...mentorRequests, newRequest]);
    setInviteMentor(null);
    alert("Request sent!");
    setPage("mentorFilter");
  };

  // mentor看到属于自己的pending/accepted请求
  const myMentorRequests = mentorRequests.filter(
    r => currentUser && r.mentorId === currentUser.id && ["pending", "accepted"].includes(r.status)
  );

  // mentor端：accept（准备进入session确认）
  const handleAcceptRequest = reqId => {
    setMentorRequests(mentorRequests.map(r =>
      r.id === reqId ? { ...r, status: "accepted" } : r
    ));
    const req = mentorRequests.find(r => r.id === reqId);
    setCurrentSession(req);
    setPage("sessionConfirm");
  };

  // mentor端：reject
  const handleRejectRequest = reqId => {
    setMentorRequests(mentorRequests.map(r =>
      r.id === reqId ? { ...r, status: "rejected" } : r
    ));
  };

  // session确认，进入feedback
  const handleSessionConfirm = sessionInfo => {
    setMentorRequests(mentorRequests.map(r =>
      r.id === sessionInfo.id ? { ...sessionInfo, status: "confirmed" } : r
    ));
    setCurrentSession(sessionInfo);
    setPage("feedback");
  };

  // feedback并结算BetaBucks
  const handleFeedback = ({ score, comment }) => {
    setFeedbacks([...feedbacks, {
      mentorId: currentSession.mentorId,
      noviceId: currentSession.noviceId,
      score,
      comment
    }]);
    // mentor到账
    const mentor = users.find(u => u.id === currentSession.mentorId);
    mentor.BetaBucksBalance = (mentor.BetaBucksBalance || 0) + (currentSession.price || 0);
    setUsers([...users]);
    alert("Feedback submitted and BetaBucksBalance transferred!");
    setPage(currentUser.position === "novice" ? "mentorFilter" : "mentorRequests");
  };

  return (
    <div>
      {currentUser && <BetaBucks user={users.find(u => u.id === currentUser.id)} />}
      {page === "login" && (
        <Login
          users={users}
          setPage={setPage}
          setCurrentUser={setCurrentUser}
          onLogin={handleLogin}
        />
      )}
      {page === "mentorFilter" && currentUser && (
        <MentorFilter
          mentors={getAllMentors(users)}
          onFilter={handleFilterMentors}
          onLogout={handleLogout}
        />
      )}
      {page === "mentorList" && (
        <MentorList
          mentors={filteredMentors}
          user={users.find(u => u.id === currentUser.id)}
          onInvite={handleInvite}
          onBack={() => setPage("mentorFilter")}
        />
      )}
      {inviteMentor && (
        <ConfirmInviteModal
          mentor={inviteMentor}
          user={users.find(u => u.id === currentUser.id)}
          onConfirm={() => handleConfirmInvite(inviteMentor)}
          onCancel={() => setInviteMentor(null)}
        />
      )}
      {page === "mentorRequests" && currentUser && (
        <MentorRequests
          requests={myMentorRequests}
          users={users}
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />
      )}
      {page === "sessionConfirm" && currentSession && (
        <SessionConfirm
          session={currentSession}
          novice={users.find(u => u.id === currentSession.noviceId)}
          onConfirm={handleSessionConfirm}
        />
      )}
      {page === "feedback" && currentSession && (
        <Feedback
          mentorName={users.find(u => u.id === currentSession.mentorId)?.name}
          onSubmit={handleFeedback}
        />
      )}
    </div>
  );
}

export default App;

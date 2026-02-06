import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Dashboard.css";

const UserProgress = () => {
  const [progress, setProgress] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem("user");

  useEffect(() => {
    api.get(`/quizzes/progress?username=${username}`)
       .then(res => setProgress(res.data));
  }, [username]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
         <h2>📊 Progress Report</h2>
         <button onClick={() => navigate("/user-dashboard")} className="logout-btn">Back</button>
      </header>
      <div className="topics-grid">
         {progress.map(p => (
           <div key={p.id} className="topic-card" style={{borderLeft: '5px solid #27ae60'}}>
             <h3>{p.topic.name}</h3>
             <p><strong>Quiz Attempts:</strong> {p.quizAttempts}</p>
             <p><strong>Latest Score:</strong> {p.latestScore} / {p.totalQuestions || '?'}</p>
             <p><strong>Last Studied:</strong> {new Date(p.lastStudiedAt).toLocaleDateString()}</p>
           </div>
         ))}
      </div>
    </div>
  );
};
export default UserProgress;
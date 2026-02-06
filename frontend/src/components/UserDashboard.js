import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Dashboard.css";

const UserDashboard = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    const fetchTopics = async () => {
      const res = await api.get("/topics");
      setTopics(res.data);
    };
    fetchTopics();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>🎓 Student Portal: {user}</h2>
        <div>
          <button onClick={() => navigate("/progress")} className="start-btn" style={{backgroundColor: '#8e44ad', fontSize: '18px'}}>
             📊 My Progress
          </button>
          <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="topics-grid">
        {topics.length === 0 ? <p>No topics available yet. Please wait for an Admin to add content.</p> : topics.map((topic) => (
          <div key={topic.id} className="topic-card">
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
            <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
              <button className="start-btn" onClick={() => navigate(`/study/${topic.id}`)}>
                📖 Study
              </button>
              <button className="start-btn" style={{backgroundColor: '#e67e22', '--hover-color': '#ad5406' }} onClick={() => navigate(`/take-quiz/${topic.id}`)}>
                📝 Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
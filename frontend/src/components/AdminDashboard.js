import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./Dashboard.css"; // Reuse existing styles

const AdminDashboard = () => {
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const response = await api.get("/topics");
      setTopics(response.data);
    } catch (error) {
      console.error("Error fetching topics");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this topic? This will delete all flashcards and quizzes inside it.")) return;
    try {
      await api.delete(`/topics/${id}`);
      setTopics(topics.filter((t) => t.id !== id));
    } catch (err) {
      alert("Error deleting topic");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header" style={{background: '#158aff'}}>
        <h2 style={{color: 'white'}}>👨‍💻 Admin Panel: {user}</h2>
        <div>
          <button onClick={() => navigate("/create-content")} className="start-btn" style={{backgroundColor: '#27ae60', fontSize: '18px' }}>
            + New Topic
          </button>
          <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="topics-grid">
        {topics.map((topic) => (
          <div key={topic.id} className="topic-card">
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
            <hr style={{margin: '15px 0', border: '0', borderTop: '1px solid #eee'}}/>
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <button onClick={() => navigate(`/add-quiz/${topic.id}`)} className="start-btn" style={{backgroundColor: '#e67e22', width: '100%'}}>
                + Add Quiz Question
              </button>
              <button onClick={() => navigate(`/admin`)} className="start-btn" style={{backgroundColor: '#3498db', width: '100%'}}>
                + Add Flashcard
              </button>
              <button onClick={() => handleDelete(topic.id)} className="logout-btn" style={{backgroundColor: '#c0392b', width: '100%', marginTop: '5px'}}>
                🗑️ Delete Topic
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
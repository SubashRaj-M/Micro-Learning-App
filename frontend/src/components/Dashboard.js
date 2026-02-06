// import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // Import our new API tool
import "./Dashboard.css";

const Dashboard = () => {
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check if user is logged in
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
      return;
    }
    setUser(storedUser);

    // 2. Fetch Topics (No need to pass token anymore!)
    fetchTopics();
  }, [navigate]);

  const fetchTopics = async () => {
    try {
      // api.js handles the Base URL and the Token automatically
      const response = await api.get("/topics");
      setTopics(response.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;
    
    try {
      // Clean delete call using api instance
      await api.delete(`/topics/${id}`);
      
      // Remove the deleted topic from the UI instantly
      setTopics(topics.filter(topic => topic.id !== id));
    } catch (error) {
      alert("Error deleting topic");
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome, {user}!</h2>
        <div>
          <button 
            onClick={() => navigate("/admin")} 
            className="start-btn" 
            style={{marginRight: '10px', backgroundColor: '#6c757d'}}
          >
            + Add Content
          </button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="topics-grid">
        {topics.length === 0 ? (
          <p>No topics available yet. Ask an admin to create some!</p>
        ) : (
          topics.map((topic) => (
            <div key={topic.id} className="topic-card">
              <h3>{topic.name}</h3>
              <p>{topic.description}</p>
              
              <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                  <button className="start-btn" onClick={() => navigate(`/study/${topic.id}`)}>
                    Start Learning
                  </button>
                  <button 
                    onClick={() => handleDelete(topic.id)} 
                    style={{background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', padding: '0 10px', cursor: 'pointer'}}
                  >
                    🗑️
                  </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
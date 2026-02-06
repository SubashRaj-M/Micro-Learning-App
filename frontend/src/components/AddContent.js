// import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "./AddContent.css";

const AddContent = () => {
  const [topicName, setTopicName] = useState("");
  const [topicDesc, setTopicDesc] = useState("");
  const [cardQuestion, setCardQuestion] = useState("");
  const [cardAnswer, setCardAnswer] = useState("");
  const [topicId, setTopicId] = useState(""); 
  const navigate = useNavigate();

  // 1. Function to Create a Topic
  const handleCreateTopic = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/topics", { 
        name: topicName, 
        description: topicDesc 
      });
      
      alert(`Topic Created! ID: ${response.data.id}`);
      setTopicId(response.data.id); 
      setTopicName("");
      setTopicDesc("");
    } catch (error) {
      alert("Error creating topic");
    }
  };

  // 2. Function to Add a Flashcard
  const handleAddFlashcard = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/topics/${topicId}/flashcards`, { 
        question: cardQuestion, 
        answer: cardAnswer 
      });

      alert("Flashcard Added!");
      setCardQuestion("");
      setCardAnswer("");
    } catch (error) {
      alert("Error adding flashcard. Check the Topic ID.");
    }
  };

  return (
    <div className="admin-container">
      {/* FIX: Changed navigation from "/dashboard" to "/admin-dashboard" */}
      <button className="back-btn" onClick={() => navigate("/admin-dashboard")} style={{backgroundColor: '#1290ff', '--hover-color': '#0070cc'}}>
        ← Back to Dashboard
      </button>

      <h2>Content Creator Panel</h2>
      
      <div className="forms-wrapper">
        <div className="admin-box">
          <h3>1. Create New Topic</h3>
          <form onSubmit={handleCreateTopic}>
            <input placeholder="Topic Name (e.g., ReactJS)" value={topicName} onChange={e => setTopicName(e.target.value)} required />
            <input placeholder="Description" value={topicDesc} onChange={e => setTopicDesc(e.target.value)} required />
            <button type="submit" className="action-btn">Create Topic</button>
          </form>
        </div>

        <div className="admin-box">
          <h3>2. Add Flashcards</h3>
          <p>Enter the Topic ID below (e.g., 1, 2, 3)</p>
          <form onSubmit={handleAddFlashcard}>
            <input type="number" placeholder="Topic ID" value={topicId} onChange={e => setTopicId(e.target.value)} required />
            <input placeholder="Question" value={cardQuestion} onChange={e => setCardQuestion(e.target.value)} required />
            <input placeholder="Answer" value={cardAnswer} onChange={e => setCardAnswer(e.target.value)} required />
            <button type="submit" className="action-btn">Add Flashcard</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContent;
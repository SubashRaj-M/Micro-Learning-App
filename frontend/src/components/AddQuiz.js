import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "./AddContent.css";

const AddQuiz = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  
  const [questionText, setQuestionText] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctOption, setCorrectOption] = useState("A");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/quizzes/${topicId}/questions`, {
        questionText, optionA, optionB, optionC, optionD, correctOption
      });
      alert("Question Added Successfully!");
      setQuestionText(""); 
      setOptionA(""); setOptionB(""); setOptionC(""); setOptionD("");
    } catch (err) {
      alert("Error adding question.");
    }
  };

  return (
    <div className="admin-container">
      <button className="back-btn" onClick={() => navigate("/admin-dashboard")} style={{backgroundColor: '#1290ff'}}>← Back to Dashboard</button>
      <h2>Add Quiz Question</h2>
      <div className="forms-wrapper">
        <div className="admin-box" style={{width: '500px'}}>
          <form onSubmit={handleSubmit}>
            <label>Question Text:</label>
            <textarea value={questionText} onChange={e => setQuestionText(e.target.value)} required style={{width: '100%', height:'80px', marginBottom:'10px'}}/>
            
            <label>Options:</label>
            <input placeholder="Option A" value={optionA} onChange={e => setOptionA(e.target.value)} required />
            <input placeholder="Option B" value={optionB} onChange={e => setOptionB(e.target.value)} required />
            <input placeholder="Option C" value={optionC} onChange={e => setOptionC(e.target.value)} required />
            <input placeholder="Option D" value={optionD} onChange={e => setOptionD(e.target.value)} required />
            
            <label>Correct Answer:</label>
            <select value={correctOption} onChange={e => setCorrectOption(e.target.value)} style={{width: '100%', padding:'10px', marginBottom:'15px'}}>
              <option value="A">Option A</option>
              <option value="B">Option B</option>
              <option value="C">Option C</option>
              <option value="D">Option D</option>
            </select>
            <button type="submit" className="action-btn">Save Question</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddQuiz;
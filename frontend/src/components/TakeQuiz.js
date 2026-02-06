import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "./Study.css";

const TakeQuiz = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/quizzes/${topicId}/questions`);
        setQuestions(res.data);
      } catch (err) {
        console.error("No questions found");
      }
    };
    fetchQuiz();
  }, [topicId]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQ].correctOption) {
      setScore(score + 1);
    }

    const nextQ = currentQ + 1;
    if (nextQ < questions.length) {
      setCurrentQ(nextQ);
    } else {
      submitScore(score + (selectedOption === questions[currentQ].correctOption ? 1 : 0));
    }
  };

  const submitScore = async (finalScore) => {
    setShowResult(true);
    const username = localStorage.getItem("user");
    try {
      // FIX: Added 'totalQuestions' to the params
      await api.post(`/quizzes/${topicId}/submit`, null, {
        params: { 
            username, 
            score: finalScore,
            totalQuestions: questions.length // <--- SEND TOTAL HERE
        }
      });
    } catch (error) {
      console.error("Failed to save progress");
    }
  };

  if (questions.length === 0) return (
    <div className="study-container">
        <h2>No Quiz Available for this Topic</h2>
        <button className="back-btn" onClick={() => navigate("/user-dashboard")}>Back</button>
    </div>
  );

  return (
    <div className="study-container">
      {showResult ? (
        <div className="flashcard" style={{cursor: 'default', height: 'auto', padding: '40px', background: 'white'}}>
          {/* Added white background to result card so dark text is visible */}
          <h2 style={{color: '#2c3e50'}}>Quiz Completed! 🎉</h2>
          <p style={{fontSize: '24px', color: '#27ae60'}}>Your Score: {score} / {questions.length}</p>
          <button className="next-btn" onClick={() => navigate("/user-dashboard")}>Back to Dashboard</button>
        </div>
      ) : (
        <div className="flashcard" style={{cursor: 'default', height: 'auto', padding: '20px'}}>
          <h3 style={{color:'#bdc3c7'}}>Question {currentQ + 1} of {questions.length}</h3>
          
          {/* FIX: Added color: 'white' to make text visible on dark background */}
          <p className="card-front" style={{
              position:'static', 
              background:'none', 
              height:'auto', 
              fontSize:'22px', 
              border:'none', 
              color: 'white', // <--- THIS IS THE FIX
              textAlign: 'center'
          }}>
            {questions[currentQ].questionText}
          </p>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px', width: '100%'}}>
            {['A', 'B', 'C', 'D'].map((opt) => (
              <button key={opt} 
                style={{padding: '15px', fontSize: '18px', cursor: 'pointer', borderRadius: '5px', border: '1px solid #bdc3c7'}}
                onClick={() => handleAnswer(opt)}>
                {questions[currentQ][`option${opt}`]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default TakeQuiz;
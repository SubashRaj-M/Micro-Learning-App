import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "./Study.css";

const Study = () => {
  const { topicId } = useParams();
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlashcards = async () => {
      try {
        const response = await api.get(`/topics/${topicId}/flashcards`);
        setFlashcards(response.data);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };
    fetchFlashcards();
  }, [topicId]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentCard((prev) => (prev + 1) % flashcards.length);
    }, 200); 
  };

  // Helper to handle back navigation
  const goBack = () => {
    // Check role to send admins back to admin dashboard if they are testing study mode
    const role = localStorage.getItem("role");
    if (role === "ADMIN") {
        navigate("/admin-dashboard");
    } else {
        navigate("/user-dashboard");
    }
  };

  if (flashcards.length === 0) return (
    <div className="study-container">
        <h2>No flashcards found for this topic!</h2>
        {/* FIX 1: Updated Redirect */}
        <button className="back-btn" style={{position: 'static', marginTop: '20px'}} onClick={goBack}>
            Back to Dashboard
        </button>
    </div>
  );

  return (
    <div className="study-container">
      {/* FIX 2: Updated Redirect */}
      <button className="back-btn" onClick={goBack}>← Back to Dashboard</button>
      
      <div className="progress-bar">
        Card {currentCard + 1} of {flashcards.length}
      </div>

      <div className={`flashcard ${isFlipped ? "flipped" : ""}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className="card-inner">
          <div className="card-front">
            <h3>Question:</h3>
            <p>{flashcards[currentCard].question}</p>
            <span className="hint">(Click to flip)</span>
          </div>
          <div className="card-back">
            <h3>Answer:</h3>
            <p>{flashcards[currentCard].answer}</p>
          </div>
        </div>
      </div>

      <button className="next-btn" onClick={handleNext}>Next Card →</button>
    </div>
  );
};

export default Study;
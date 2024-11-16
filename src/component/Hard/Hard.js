import React, { useState, useEffect, useCallback, useMemo } from "react";  // Import useMemo here
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Hard.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser } from '../../UserContext';

function Easy() {
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [message, setMessage] = useState("");
  const [questionStats, setQuestionStats] = useState([]); // Track each question's correctness
  const { username, loading } = useUser();

  // Use useMemo to memoize the question bank
  const questionBank = useMemo(() => [
    { id: 1, question: "(15 + 24) * 2", correctAnswer: 78 },
  { id: 2, question: "(47 - 23) * 3", correctAnswer: 72 },
  { id: 3, question: "(32 * 11) / 4", correctAnswer: 88 },
  { id: 4, question: "(96 / 12) * 3", correctAnswer: 24 },
  { id: 5, question: "(58 + 21) * 2", correctAnswer: 158 },
  { id: 6, question: "(63 - 37) * 4", correctAnswer: 104 },
  { id: 7, question: "(47 * 14) / 7", correctAnswer: 94 },
  { id: 8, question: "(84 / 7) * 2", correctAnswer: 24 },
  { id: 9, question: "(72 + 9) * 3", correctAnswer: 243 },
  { id: 10, question: "(56 - 22) * 2", correctAnswer: 68 },
  { id: 11, question: "(36 * 8) / 3", correctAnswer: 96 },
  { id: 12, question: "(84 / 4) * 3", correctAnswer: 63 },
  { id: 13, question: "(91 + 12) * 5", correctAnswer: 515 },
  { id: 14, question: "(68 - 35) * 2", correctAnswer: 66 },
  { id: 15, question: "(55 * 6) / 10", correctAnswer: 33 },
  { id: 16, question: "(81 / 9) * 2", correctAnswer: 18 },
  { id: 17, question: "(74 + 25) * 3", correctAnswer: 297 },
  { id: 18, question: "(99 - 44) * 2", correctAnswer: 110 },
  { id: 19, question: "(62 * 5) / 2", correctAnswer: 155 },
  { id: 20, question: "(80 / 8) * 3", correctAnswer: 30 },
  { id: 21, question: "(45 + 35) * 3", correctAnswer: 240 },
  { id: 22, question: "(91 - 53) * 2", correctAnswer: 76 },
  { id: 23, question: "(67 * 3) / 2", correctAnswer: 100.5 },
  { id: 24, question: "(49 + 14) * 2", correctAnswer: 126 },
  { id: 25, question: "(55 * 6) / 5", correctAnswer: 66 },
  { id: 26, question: "(44 + 16) * 2", correctAnswer: 120 },
  { id: 27, question: "(38 * 3) - 14", correctAnswer: 100 },
  { id: 28, question: "(72 / 9) * 5", correctAnswer: 40 },
  { id: 29, question: "(90 - 30) / 2", correctAnswer: 30 },
  { id: 30, question: "(67 * 4) / 3", correctAnswer: 89.33 },
  { id: 31, question: "(99 - 44) * 3", correctAnswer: 165 },
  { id: 32, question: "(27 + 58) * 2", correctAnswer: 170 },
  { id: 33, question: "(80 * 2) / 5", correctAnswer: 32 },
  { id: 34, question: "(45 * 5) / 3", correctAnswer: 75 },
  { id: 35, question: "(23 + 17) * 2", correctAnswer: 80 },
  { id: 36, question: "(91 * 3) / 7", correctAnswer: 39 },
  { id: 37, question: "(56 * 3) - 14", correctAnswer: 154 },
  { id: 38, question: "(48 + 12) * 4", correctAnswer: 240 },
  { id: 39, question: "(84 / 4) * 5", correctAnswer: 105 },
  { id: 40, question: "(92 - 48) * 2", correctAnswer: 88 },
  { id: 41, question: "(77 * 3) / 7", correctAnswer: 33 },
  { id: 42, question: "(62 + 38) * 2", correctAnswer: 200 },
  { id: 43, question: "(56 + 12) * 3", correctAnswer: 204 },
  { id: 44, question: "(60 * 4) / 5", correctAnswer: 48 },
  { id: 45, question: "(31 + 49) * 2", correctAnswer: 160 },
  { id: 46, question: "(75 / 3) * 5", correctAnswer: 125 },
  { id: 47, question: "(82 + 16) * 3", correctAnswer: 294 },
  { id: 48, question: "(100 - 80) * 6", correctAnswer: 120 },
  { id: 49, question: "(64 + 16) * 2", correctAnswer: 160 },
  { id: 50, question: "(120 / 4) * 5", correctAnswer: 150 },
  { id: 51, question: "(15 + 24) / 2", correctAnswer: 19.5 },
  { id: 52, question: "(90 - 33) / 3", correctAnswer: 19 },
  { id: 53, question: "(78 * 4) / 7", correctAnswer: 44.57 },
  { id: 54, question: "(85 / 2) * 3", correctAnswer: 127.5 },
  { id: 55, question: "(123 / 4) * 2", correctAnswer: 61.5 },
  { id: 56, question: "(74 * 5) / 8", correctAnswer: 46.25 },
  { id: 57, question: "(56 * 6) / 5", correctAnswer: 67.2 },
  { id: 58, question: "(100 - 25) / 2", correctAnswer: 37.5 },
  { id: 59, question: "(120 * 7) / 5", correctAnswer: 168 },
  { id: 60, question: "(45 * 4) / 3", correctAnswer: 60 },
  { id: 61, question: "(90 * 3) / 7", correctAnswer: 38.57 },
  { id: 62, question: "(56 * 8) / 10", correctAnswer: 44.8 },
  { id: 63, question: "(48 + 16) / 4", correctAnswer: 16 },
  { id: 64, question: "(33 * 5) / 8", correctAnswer: 20.625 },
  { id: 65, question: "(50 + 75) / 3", correctAnswer: 41.67 },
  { id: 66, question: "(90 - 40) / 3", correctAnswer: 16.67 },
  { id: 67, question: "(63 * 3) / 5", correctAnswer: 37.8 },
  { id: 68, question: "(121 / 4) * 2", correctAnswer: 60.5 },
  { id: 69, question: "(44 * 3) / 5", correctAnswer: 26.4 },
  { id: 70, question: "(32 * 5) / 6", correctAnswer: 26.67 },
  { id: 71, question: "(150 - 60) / 3", correctAnswer: 30 },
  { id: 72, question: "(85 * 7) / 8", correctAnswer: 74.38 },
  { id: 73, question: "(160 / 5) * 3", correctAnswer: 96 },
  { id: 74, question: "(90 + 25) / 2", correctAnswer: 57.5 },
  { id: 75, question: "(88 / 4) * 2", correctAnswer: 44 },
  { id: 76, question: "(96 / 8) * 3", correctAnswer: 36 },
  { id: 77, question: "(135 - 75) / 3", correctAnswer: 20 },
  { id: 78, question: "(120 / 8) * 4", correctAnswer: 60 },
  { id: 79, question: "(56 * 9) / 4", correctAnswer: 126 },
  { id: 80, question: "(84 / 3) * 2", correctAnswer: 56 },
  { id: 81, question: "(52 * 2) / 5", correctAnswer: 20.8 },
  { id: 82, question: "(84 + 24) / 3", correctAnswer: 36 },
  { id: 83, question: "(102 * 3) / 5", correctAnswer: 61.2 },
  { id: 84, question: "(74 * 4) / 7", correctAnswer: 42.29 },
  { id: 85, question: "(108 / 3) * 2", correctAnswer: 72 },
  { id: 86, question: "(140 - 75) / 5", correctAnswer: 13 },
  { id: 87, question: "(300 / 6) * 2", correctAnswer: 100 },
  { id: 88, question: "(120 + 36) / 5", correctAnswer: 31.2 },
  { id: 89, question: "(35 * 3) / 8", correctAnswer: 13.125 },
  { id: 90, question: "(75 + 45) / 6", correctAnswer: 20 },
  { id: 91, question: "(56 * 5) / 3", correctAnswer: 93.33 },
  { id: 92, question: "(64 + 96) / 8", correctAnswer: 20 },
  { id: 93, question: "(100 / 4) * 2", correctAnswer: 50 },
  { id: 94, question: "(78 + 18) / 3", correctAnswer: 32 },
  { id: 95, question: "(72 * 4) / 7", correctAnswer: 41.14 },
  { id: 96, question: "(60 + 40) / 5", correctAnswer: 20 },
  { id: 97, question: "(40 * 9) / 5", correctAnswer: 72 },
  { id: 98, question: "(36 * 6) / 5", correctAnswer: 43.2 },
  { id: 99, question: "(98 / 4) * 3", correctAnswer: 73.5 },
  { id: 100, question: "(120 / 5) * 4", correctAnswer: 96 }
  ], []);

  // Use useCallback to memoize the generateQuestion function
  const generateQuestion = useCallback(() => {
    const randomQuestion = questionBank[Math.floor(Math.random() * questionBank.length)];
    setCurrentQuestion(randomQuestion);
    setAnswer("");
  }, [questionBank]); // Depend on questionBank

  // Use useCallback for compareAndUpdateHighScores
  const compareAndUpdateHighScores = useCallback(async () => {
    if (!username) {
      setMessage("Username not found.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/updateHard', {
        username: username,
        score: score
      });
    } catch (error) {
      console.error('Error updating score:', error);
      setMessage("Error updating score.");
    }
  }, [username, score]); // Depend on username and score

  // Use useCallback for saveQuestionStats
  const saveQuestionStats = useCallback(async () => {
    try {
      await axios.post('http://localhost:5000/api/savequestion_statshard', {
        username: username,
        questionStats: questionStats
      });
    } catch (error) {
      console.error('Error saving question stats:', error);
      setMessage("Error saving question stats.");
    }
  }, [username, questionStats]); // Depend on username and questionStats

  useEffect(() => {
    if (loading) return;
    generateQuestion();
  }, [loading, generateQuestion]);  // Add generateQuestion to the dependencies

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timerId);
    } else {
      setMessage("Time's up! Your final score is " + score);
      compareAndUpdateHighScores();
      saveQuestionStats();  // Save question stats to database
    }
  }, [timeLeft, score, compareAndUpdateHighScores, saveQuestionStats]);  // Add missing functions to dependencies

  const checkAnswer = () => {
    const isCorrect = parseInt(answer) === currentQuestion.correctAnswer;
    setScore(prevScore => (isCorrect ? prevScore + 1 : prevScore));
    setMessage(isCorrect ? "Correct!" : "Wrong! Try again.");

    // Store question result with ID and correctness as 'correct' or 'incorrect'
    setQuestionStats(prevStats => [
      ...prevStats,
      { questionId: currentQuestion.id, result: isCorrect ? 'correct' : 'incorrect' }
    ]);

    generateQuestion();
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setMessage("");
    setQuestionStats([]); // Reset question stats
    generateQuestion();
  };

  if (loading || !username) {
    return <p>Loading or User not found...</p>;
  }

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh', backgroundColor: '#f5f5f5', fontFamily: 'Press Start 2P', color: '#333' }}>
    <h1 className="mb-4" style={{ fontSize: '3rem', color: '#333' }}>Math Quiz Game</h1>
    <p className="mb-2" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Time left: <span style={{ color: '#e74c3c' }}>{timeLeft} seconds</span></p>
    <p className="mb-4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Score: <span style={{ color: '#2ecc71' }}>{score}</span></p>
  
    <div className="question mb-3" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
      <span>{currentQuestion.question}</span> <span></span> = ?
    </div>
  
    <input
      type="number"
      className="form-control mb-3 w-25 text-center"
      value={answer}
      onChange={(e) => setAnswer(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") checkAnswer();
      }}
      disabled={timeLeft === 0}
      placeholder="Your answer"
      style={{
        fontSize: '1.5rem',
        padding: '15px',
        textAlign: 'center',
        width: '250px',
        borderRadius: '10px',
        border: '2px solid #3498db'
      }}
    />
  
    <button 
      className="btn btn-primary mb-3" 
      onClick={checkAnswer} 
      disabled={timeLeft === 0}
      style={{
        fontSize: '1.5rem',
        padding: '15px 40px',
        backgroundColor: '#3498db',
        color: 'white',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
      }}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
    >
      Submit Answer
    </button>
  
    <p className={`mb-4 ${message === "Correct!" ? "text-success" : "text-danger"}`} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{message}</p>
  
    {timeLeft === 0 && (
      <>
        <button 
          className="btn btn-success mb-3" 
          onClick={resetGame}
          style={{
            fontSize: '1.5rem',
            padding: '15px 40px',
            backgroundColor: '#2ecc71',
            color: 'white',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          Play Again
        </button>
        <Link 
          className="btn btn-secondary mb-3" 
          to="/Menu"
          style={{
            fontSize: '1.5rem',
            padding: '15px 40px',
            backgroundColor: '#95a5a6',
            color: 'white',
            borderRadius: '10px',
            textDecoration: 'none',
            display: 'inline-block',
          }}
        >
          BACK
        </Link>
      </>
    )}
  </div>
  );
}

export default Easy;

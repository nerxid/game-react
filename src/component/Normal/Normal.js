import React, { useState, useEffect, useCallback, useMemo } from "react";  // Import useMemo here
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Normal.css";
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
    { id: 1, num1: 15, num2: 24, operator: "+", correctAnswer: 39 },
  { id: 2, num1: 47, num2: 23, operator: "-", correctAnswer: 24 },
  { id: 3, num1: 32, num2: 11, operator: "*", correctAnswer: 352 },
  { id: 4, num1: 96, num2: 12, operator: "/", correctAnswer: 8 },
  { id: 5, num1: 58, num2: 21, operator: "+", correctAnswer: 79 },
  { id: 6, num1: 63, num2: 37, operator: "-", correctAnswer: 26 },
  { id: 7, num1: 47, num2: 14, operator: "*", correctAnswer: 658 },
  { id: 8, num1: 84, num2: 7, operator: "/", correctAnswer: 12 },
  { id: 9, num1: 72, num2: 9, operator: "+", correctAnswer: 81 },
  { id: 10, num1: 56, num2: 22, operator: "-", correctAnswer: 34 },
  { id: 11, num1: 36, num2: 8, operator: "*", correctAnswer: 288 },
  { id: 12, num1: 84, num2: 4, operator: "/", correctAnswer: 21 },
  { id: 13, num1: 91, num2: 12, operator: "+", correctAnswer: 103 },
  { id: 14, num1: 68, num2: 35, operator: "-", correctAnswer: 33 },
  { id: 15, num1: 55, num2: 6, operator: "*", correctAnswer: 330 },
  { id: 16, num1: 81, num2: 9, operator: "/", correctAnswer: 9 },
  { id: 17, num1: 74, num2: 25, operator: "+", correctAnswer: 99 },
  { id: 18, num1: 99, num2: 44, operator: "-", correctAnswer: 55 },
  { id: 19, num1: 62, num2: 5, operator: "*", correctAnswer: 310 },
  { id: 20, num1: 80, num2: 8, operator: "/", correctAnswer: 10 },
  { id: 21, num1: 45, num2: 15, operator: "+", correctAnswer: 60 },
  { id: 22, num1: 92, num2: 38, operator: "-", correctAnswer: 54 },
  { id: 23, num1: 27, num2: 13, operator: "*", correctAnswer: 351 },
  { id: 24, num1: 72, num2: 9, operator: "/", correctAnswer: 8 },
  { id: 25, num1: 53, num2: 18, operator: "+", correctAnswer: 71 },
  { id: 26, num1: 68, num2: 25, operator: "-", correctAnswer: 43 },
  { id: 27, num1: 35, num2: 11, operator: "*", correctAnswer: 385 },
  { id: 28, num1: 96, num2: 8, operator: "/", correctAnswer: 12 },
  { id: 29, num1: 89, num2: 21, operator: "+", correctAnswer: 110 },
  { id: 30, num1: 64, num2: 33, operator: "-", correctAnswer: 31 },
  { id: 31, num1: 53, num2: 7, operator: "*", correctAnswer: 371 },
  { id: 32, num1: 78, num2: 6, operator: "/", correctAnswer: 13 },
  { id: 33, num1: 93, num2: 29, operator: "+", correctAnswer: 122 },
  { id: 34, num1: 74, num2: 43, operator: "-", correctAnswer: 31 },
  { id: 35, num1: 41, num2: 17, operator: "*", correctAnswer: 697 },
  { id: 36, num1: 90, num2: 5, operator: "/", correctAnswer: 18 },
  { id: 37, num1: 85, num2: 26, operator: "+", correctAnswer: 111 },
  { id: 38, num1: 99, num2: 48, operator: "-", correctAnswer: 51 },
  { id: 39, num1: 74, num2: 9, operator: "*", correctAnswer: 666 },
  { id: 40, num1: 96, num2: 6, operator: "/", correctAnswer: 16 },
  { id: 41, num1: 82, num2: 13, operator: "+", correctAnswer: 95 },
  { id: 42, num1: 61, num2: 30, operator: "-", correctAnswer: 31 },
  { id: 43, num1: 56, num2: 12, operator: "*", correctAnswer: 672 },
  { id: 44, num1: 81, num2: 27, operator: "/", correctAnswer: 3 },
  { id: 45, num1: 68, num2: 16, operator: "+", correctAnswer: 84 },
  { id: 46, num1: 94, num2: 45, operator: "-", correctAnswer: 49 },
  { id: 47, num1: 39, num2: 8, operator: "*", correctAnswer: 312 },
  { id: 48, num1: 56, num2: 7, operator: "/", correctAnswer: 8 },
  { id: 49, num1: 78, num2: 26, operator: "+", correctAnswer: 104 },
  { id: 50, num1: 91, num2: 36, operator: "-", correctAnswer: 55 },
  { id: 51, num1: 56, num2: 14, operator: "+", correctAnswer: 70 },
  { id: 52, num1: 78, num2: 42, operator: "-", correctAnswer: 36 },
  { id: 53, num1: 31, num2: 19, operator: "*", correctAnswer: 589 },
  { id: 54, num1: 88, num2: 8, operator: "/", correctAnswer: 11 },
  { id: 55, num1: 53, num2: 16, operator: "+", correctAnswer: 69 },
  { id: 56, num1: 92, num2: 44, operator: "-", correctAnswer: 48 },
  { id: 57, num1: 41, num2: 13, operator: "*", correctAnswer: 533 },
  { id: 58, num1: 84, num2: 7, operator: "/", correctAnswer: 12 },
  { id: 59, num1: 77, num2: 12, operator: "+", correctAnswer: 89 },
  { id: 60, num1: 56, num2: 21, operator: "-", correctAnswer: 35 },
  { id: 61, num1: 39, num2: 9, operator: "*", correctAnswer: 351 },
  { id: 62, num1: 64, num2: 8, operator: "/", correctAnswer: 8 },
  { id: 63, num1: 86, num2: 31, operator: "+", correctAnswer: 117 },
  { id: 64, num1: 92, num2: 24, operator: "-", correctAnswer: 68 },
  { id: 65, num1: 73, num2: 9, operator: "*", correctAnswer: 657 },
  { id: 66, num1: 81, num2: 3, operator: "/", correctAnswer: 27 },
  { id: 67, num1: 53, num2: 26, operator: "+", correctAnswer: 79 },
  { id: 68, num1: 75, num2: 19, operator: "-", correctAnswer: 56 },
  { id: 69, num1: 36, num2: 22, operator: "*", correctAnswer: 792 },
  { id: 70, num1: 96, num2: 4, operator: "/", correctAnswer: 24 },
  { id: 71, num1: 67, num2: 23, operator: "+", correctAnswer: 90 },
  { id: 72, num1: 81, num2: 29, operator: "-", correctAnswer: 52 },
  { id: 73, num1: 94, num2: 14, operator: "*", correctAnswer: 1316 },
  { id: 74, num1: 75, num2: 5, operator: "/", correctAnswer: 15 },
  { id: 75, num1: 63, num2: 27, operator: "+", correctAnswer: 90 },
  { id: 76, num1: 88, num2: 41, operator: "-", correctAnswer: 47 },
  { id: 77, num1: 45, num2: 7, operator: "*", correctAnswer: 315 },
  { id: 78, num1: 64, num2: 16, operator: "/", correctAnswer: 4 },
  { id: 79, num1: 92, num2: 22, operator: "+", correctAnswer: 114 },
  { id: 80, num1: 54, num2: 28, operator: "-", correctAnswer: 26 },
  { id: 81, num1: 77, num2: 17, operator: "*", correctAnswer: 1309 },
  { id: 82, num1: 72, num2: 9, operator: "/", correctAnswer: 8 },
  { id: 83, num1: 94, num2: 37, operator: "+", correctAnswer: 131 },
  { id: 84, num1: 99, num2: 44, operator: "-", correctAnswer: 55 },
  { id: 85, num1: 65, num2: 16, operator: "*", correctAnswer: 1040 },
  { id: 86, num1: 72, num2: 8, operator: "/", correctAnswer: 9 },
  { id: 87, num1: 49, num2: 7, operator: "+", correctAnswer: 56 },
  { id: 88, num1: 53, num2: 19, operator: "-", correctAnswer: 34 },
  { id: 89, num1: 92, num2: 8, operator: "*", correctAnswer: 736 },
  { id: 90, num1: 84, num2: 12, operator: "/", correctAnswer: 7 },
  { id: 91, num1: 55, num2: 13, operator: "+", correctAnswer: 68 },
  { id: 92, num1: 61, num2: 23, operator: "-", correctAnswer: 38 },
  { id: 93, num1: 94, num2: 12, operator: "*", correctAnswer: 1128 },
  { id: 94, num1: 72, num2: 6, operator: "/", correctAnswer: 12 },
  { id: 95, num1: 65, num2: 28, operator: "+", correctAnswer: 93 },
  { id: 96, num1: 74, num2: 19, operator: "-", correctAnswer: 55 },
  { id: 97, num1: 39, num2: 23, operator: "*", correctAnswer: 897 },
  { id: 98, num1: 48, num2: 8, operator: "/", correctAnswer: 6 },
  { id: 99, num1: 69, num2: 26, operator: "+", correctAnswer: 95 },
  { id: 100, num1: 88, num2: 21, operator: "-", correctAnswer: 67 },
  { id: 101, num1: 63, num2: 17, operator: "+", correctAnswer: 80 },
  { id: 102, num1: 89, num2: 45, operator: "-", correctAnswer: 44 },
  { id: 103, num1: 76, num2: 14, operator: "*", correctAnswer: 1064 },
  { id: 104, num1: 72, num2: 9, operator: "/", correctAnswer: 8 },
  { id: 105, num1: 58, num2: 22, operator: "+", correctAnswer: 80 },
  { id: 106, num1: 82, num2: 28, operator: "-", correctAnswer: 54 },
  { id: 107, num1: 91, num2: 19, operator: "*", correctAnswer: 1729 },
  { id: 108, num1: 64, num2: 8, operator: "/", correctAnswer: 8 },
  { id: 109, num1: 74, num2: 13, operator: "+", correctAnswer: 87 },
  { id: 110, num1: 93, num2: 41, operator: "-", correctAnswer: 52 },
  { id: 111, num1: 88, num2: 14, operator: "*", correctAnswer: 1232 },
  { id: 112, num1: 77, num2: 7, operator: "/", correctAnswer: 11 },
  { id: 113, num1: 93, num2: 19, operator: "+", correctAnswer: 112 },
  { id: 114, num1: 82, num2: 23, operator: "-", correctAnswer: 59 },
  { id: 115, num1: 49, num2: 17, operator: "*", correctAnswer: 833 },
  { id: 116, num1: 64, num2: 8, operator: "/", correctAnswer: 8 },
  { id: 117, num1: 92, num2: 37, operator: "+", correctAnswer: 129 },
  { id: 118, num1: 81, num2: 25, operator: "-", correctAnswer: 56 },
  { id: 119, num1: 94, num2: 12, operator: "*", correctAnswer: 1128 },
  { id: 120, num1: 55, num2: 5, operator: "/", correctAnswer: 11 },
  { id: 121, num1: 84, num2: 22, operator: "+", correctAnswer: 106 },
  { id: 122, num1: 63, num2: 28, operator: "-", correctAnswer: 35 },
  { id: 123, num1: 47, num2: 25, operator: "*", correctAnswer: 1175 },
  { id: 124, num1: 93, num2: 12, operator: "/", correctAnswer: 7.75 },
  { id: 125, num1: 78, num2: 19, operator: "+", correctAnswer: 97 },
  { id: 126, num1: 88, num2: 36, operator: "-", correctAnswer: 52 },
  { id: 127, num1: 67, num2: 8, operator: "*", correctAnswer: 536 },
  { id: 128, num1: 64, num2: 16, operator: "/", correctAnswer: 4 },
  { id: 129, num1: 91, num2: 18, operator: "+", correctAnswer: 109 },
  { id: 130, num1: 89, num2: 12, operator: "-", correctAnswer: 77 },
  { id: 131, num1: 44, num2: 11, operator: "*", correctAnswer: 484 },
  { id: 132, num1: 78, num2: 6, operator: "/", correctAnswer: 13 },
  { id: 133, num1: 64, num2: 9, operator: "+", correctAnswer: 73 },
  { id: 134, num1: 92, num2: 47, operator: "-", correctAnswer: 45 },
  { id: 135, num1: 53, num2: 19, operator: "*", correctAnswer: 1007 },
  { id: 136, num1: 76, num2: 8, operator: "/", correctAnswer: 9.5 },
  { id: 137, num1: 85, num2: 25, operator: "+", correctAnswer: 110 },
  { id: 138, num1: 81, num2: 12, operator: "-", correctAnswer: 69 },
  { id: 139, num1: 92, num2: 18, operator: "*", correctAnswer: 1656 },
  { id: 140, num1: 64, num2: 8, operator: "/", correctAnswer: 8 },
  { id: 141, num1: 49, num2: 6, operator: "+", correctAnswer: 55 },
  { id: 142, num1: 91, num2: 34, operator: "-", correctAnswer: 57 },
  { id: 143, num1: 85, num2: 25, operator: "*", correctAnswer: 2125 },
  { id: 144, num1: 92, num2: 4, operator: "/", correctAnswer: 23 },
  { id: 145, num1: 77, num2: 18, operator: "+", correctAnswer: 95 },
  { id: 146, num1: 63, num2: 17, operator: "-", correctAnswer: 46 },
  { id: 147, num1: 72, num2: 8, operator: "*", correctAnswer: 576 },
  { id: 148, num1: 94, num2: 7, operator: "/", correctAnswer: 13.43 },
  { id: 149, num1: 51, num2: 21, operator: "+", correctAnswer: 72 },
  { id: 150, num1: 68, num2: 18, operator: "-", correctAnswer: 50 },
  { id: 151, num1: 63, num2: 12, operator: "+", correctAnswer: 75 },
  { id: 152, num1: 89, num2: 29, operator: "-", correctAnswer: 60 },
  { id: 153, num1: 72, num2: 13, operator: "*", correctAnswer: 936 },
  { id: 154, num1: 96, num2: 4, operator: "/", correctAnswer: 24 },
  { id: 155, num1: 45, num2: 17, operator: "+", correctAnswer: 62 },
  { id: 156, num1: 82, num2: 29, operator: "-", correctAnswer: 53 },
  { id: 157, num1: 91, num2: 23, operator: "*", correctAnswer: 2093 },
  { id: 158, num1: 64, num2: 16, operator: "/", correctAnswer: 4 },
  { id: 159, num1: 74, num2: 12, operator: "+", correctAnswer: 86 },
  { id: 160, num1: 93, num2: 24, operator: "-", correctAnswer: 69 },
  { id: 161, num1: 88, num2: 5, operator: "*", correctAnswer: 440 },
  { id: 162, num1: 77, num2: 9, operator: "/", correctAnswer: 8.56 },
  { id: 163, num1: 93, num2: 28, operator: "+", correctAnswer: 121 },
  { id: 164, num1: 82, num2: 18, operator: "-", correctAnswer: 64 },
  { id: 165, num1: 49, num2: 15, operator: "*", correctAnswer: 735 },
  { id: 166, num1: 64, num2: 8, operator: "/", correctAnswer: 8 },
  { id: 167, num1: 92, num2: 41, operator: "+", correctAnswer: 133 },
  { id: 168, num1: 81, num2: 19, operator: "-", correctAnswer: 62 },
  { id: 169, num1: 94, num2: 13, operator: "*", correctAnswer: 1222 },
  { id: 170, num1: 55, num2: 11, operator: "/", correctAnswer: 5 },
  { id: 171, num1: 84, num2: 33, operator: "+", correctAnswer: 117 },
  { id: 172, num1: 63, num2: 29, operator: "-", correctAnswer: 34 },
  { id: 173, num1: 47, num2: 13, operator: "*", correctAnswer: 611 },
  { id: 174, num1: 93, num2: 9, operator: "/", correctAnswer: 10.33 },
  { id: 175, num1: 78, num2: 14, operator: "+", correctAnswer: 92 },
  { id: 176, num1: 88, num2: 37, operator: "-", correctAnswer: 51 },
  { id: 177, num1: 67, num2: 6, operator: "*", correctAnswer: 402 },
  { id: 178, num1: 64, num2: 20, operator: "/", correctAnswer: 3.2 },
  { id: 179, num1: 91, num2: 19, operator: "+", correctAnswer: 110 },
  { id: 180, num1: 89, num2: 18, operator: "-", correctAnswer: 71 },
  { id: 181, num1: 44, num2: 9, operator: "*", correctAnswer: 396 },
  { id: 182, num1: 78, num2: 11, operator: "/", correctAnswer: 7.09 },
  { id: 183, num1: 64, num2: 6, operator: "+", correctAnswer: 70 },
  { id: 184, num1: 92, num2: 27, operator: "-", correctAnswer: 65 },
  { id: 185, num1: 53, num2: 23, operator: "*", correctAnswer: 1219 },
  { id: 186, num1: 76, num2: 5, operator: "/", correctAnswer: 15.2 },
  { id: 187, num1: 85, num2: 32, operator: "+", correctAnswer: 117 },
  { id: 188, num1: 81, num2: 8, operator: "-", correctAnswer: 73 },
  { id: 189, num1: 92, num2: 22, operator: "*", correctAnswer: 2024 },
  { id: 190, num1: 64, num2: 4, operator: "/", correctAnswer: 16 },
  { id: 191, num1: 49, num2: 12, operator: "+", correctAnswer: 61 },
  { id: 192, num1: 91, num2: 26, operator: "-", correctAnswer: 65 },
  { id: 193, num1: 85, num2: 29, operator: "*", correctAnswer: 2465 },
  { id: 194, num1: 92, num2: 6, operator: "/", correctAnswer: 15.33 },
  { id: 195, num1: 77, num2: 14, operator: "+", correctAnswer: 91 },
  { id: 196, num1: 63, num2: 17, operator: "-", correctAnswer: 46 },
  { id: 197, num1: 72, num2: 7, operator: "*", correctAnswer: 504 },
  { id: 198, num1: 94, num2: 8, operator: "/", correctAnswer: 11.75 },
  { id: 199, num1: 51, num2: 16, operator: "+", correctAnswer: 67 },
  { id: 200, num1: 68, num2: 10, operator: "-", correctAnswer: 58 }
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
      await axios.post('http://localhost:5000/api/updateNormal', {
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
      await axios.post('http://localhost:5000/api/savequestion_statsnormal', {
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
      <span>{currentQuestion.num1}</span> <span>{currentQuestion.operator}</span> <span>{currentQuestion.num2}</span> = ?
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

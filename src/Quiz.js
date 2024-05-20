import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizComponent = ({userData}) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
 const navigate = useNavigate();
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await fetch("http://localhost:5000/getQuestions", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const { message } = await response.json();
      setQuestions(message);

    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const sendScores = async () => {
    try {
      const response = await fetch("http://localhost:5000/addscore", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: userData, score: score})
      });
      const { message } = await response.json();

      alert("Saved Scored to database!")
    

    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleChoiceSelect = (choiceIndex) => {
    setSelectedChoiceIndex(choiceIndex);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedChoiceIndex !== null) {
      if (currentQuestion.correctChoiceIndex === selectedChoiceIndex) {
        setScore(score + 1);
        setFeedbackMessage('Correct!');
        
        setTimeout(() => {
            setShowFeedback(false);
             setSelectedChoiceIndex(null);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }, 1000);

      } else {
        setFeedbackMessage('Incorrect!');
        setTimeout(() => {
            setShowFeedback(false);
      setSelectedChoiceIndex(null);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
          }, 1000);
      }
      setShowFeedback(true);
    } else {
      setFeedbackMessage('Please select an option.');
      setShowFeedback(true);
    }

  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (currentQuestionIndex >= questions.length) {
    
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2 style={{ color: '#4caf50' }}>Quiz Over!</h2>
        <p style={{ fontSize: '20px' }}>Your Score: {score}</p>
        <button
        onClick={() => {sendScores()}}
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          backgroundColor: '#4caf50',
          color: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
       Save Scores
      </button>
      <button
        onClick={() => { navigate("/")}}
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          backgroundColor: 'violet',
          color: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          marginTop: '20px',
          marginLeft: 20
        }}
      >
      Logout
      </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      <ul>
        {currentQuestion.choices.map((choice, index) => (
          <li
            key={index}
            onClick={() => handleChoiceSelect(index)}
            style={{
              cursor: 'pointer',
              marginBottom: '10px',
              padding: '10px',
              borderRadius: '5px',
              backgroundColor: selectedChoiceIndex === index ? '#2196f3' : '#ffffff',
              color: selectedChoiceIndex === index ? '#ffffff' : '#000000',
              border: '1px solid #cccccc',
            }}
          >
            {choice}
          </li>
        ))}
      </ul>
      {showFeedback && <p>{feedbackMessage}</p>}
      <button
        onClick={handleNextQuestion}
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          backgroundColor: '#4caf50',
          color: '#ffffff',
          border: 'none',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Next Question
      </button>
    </div>
  );
};

export default QuizComponent;

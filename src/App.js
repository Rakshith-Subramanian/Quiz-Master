import React from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import HomePage from './LoginPage';
import LoginPage from './LoginPage';
import QuizComponent from './Quiz';
import Signup from './Signup';
import { useState } from 'react';
import Scoreboard from './ScoreBoard';
const App = () => {

  const [userData, setUserData] = useState(null); // Example state for user data

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUserData={setUserData}/>} />
        <Route path="/quiz" element={<QuizComponent userData={userData} />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admin" element={<Scoreboard/>} />
    
    
      </Routes>

    </Router>
  );
}

export default App;

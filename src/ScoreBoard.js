import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Scoreboard = () => {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await fetch("http://localhost:5000/scores", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const { message } = await response.json();
      setScores(message);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  return (
    <div>
      <h2>Scoreboard</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={headerStyle}>Username</th>
            <th style={headerStyle}>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((user, index) => (
            <tr key={index}>
              <td style={cellStyle}>{user.username}</td>
              <td style={cellStyle}>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
};

// Define inline styles
const headerStyle = {
  backgroundColor: '#f2f2f2',
  fontWeight: 'bold',
  padding: '8px 16px',
  border: '1px solid #ddd',
};

const cellStyle = {
  padding: '8px 16px',
  border: '1px solid #ddd',
};

export default Scoreboard;

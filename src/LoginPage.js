import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation

const LoginPage = ({setUserData}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedAdmin, setLoggedAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initializing navigate hook



  const handleLogin = async () => {
    
    try {
      let res = await fetch("http://localhost:5000/login", {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })

      });
    let {message} = await res.json()

    console.log(message)

    if(message == 'OK')
      {
        setUserData(username)
        navigate('/quiz')
      }
    
      if(message == 'OK' && username == 'admin')
        {
          setUserData(username)
          navigate('/admin')
        }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '50px auto', maxWidth: '300px' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Login</h2>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Username:</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }} 
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '3px' }} 
        />
      </div>
      <button 
        onClick={handleLogin} 
        style={{ 
          width: '100%', 
          padding: '10px', 
          border: 'none', 
          borderRadius: '3px', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
      >
        Login
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    
      <button 
        onClick={() => {navigate('/signup')} } 
        style={{ 
          width: '100%', 
          padding: '10px', 
          border: 'none', 
          borderRadius: '3px', 
          backgroundColor: 'yellow', 
          
          color: 'black', 
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          marginTop: 20

        }}
      >
        Signup
      </button>
    </div>
  );
};

export default LoginPage;

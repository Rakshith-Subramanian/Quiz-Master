import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation


export default function Signup()
{

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const navigate = useNavigate(); // Initializing navigate hook


    const handleSignup = async () => {
    
        try {
          let res = await fetch("http://localhost:5000/signup", {
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
      
            navigate('/')
          }
    
        } catch (error) {
          console.log(error);
        }
      };
    

    return (
        <div style={{ textAlign: 'center', margin: '50px auto', maxWidth: '300px' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Sign Up</h2>
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
          onClick={() => { handleSignup() }} 
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
          Create Account
        </button>
     
    
      </div>

    );
}
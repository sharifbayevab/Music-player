import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Registration.css';
import authService from '../services/authService';

function Regstration({fetchTracks}) {
  
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await authService.register(username, email, password);
      fetchTracks();
      navigate("/mainpage");
    } catch (error) {
      console.error('Ошибка регистрации', error);
      setError('Ошибка регистрации. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <div className='regPage'>
        <div className="header">
            <h1>MelodyMingle</h1>
        </div>
        <div className="container">
            <div className='page-name-reg'>Registration</div>
            <div className="login-form">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button onClick={handleRegistration} className="login-button">REGISTER</button>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
        <div className="music-bar">
             <div className="image"></div>
        </div>
    </div>
  );
}

export default Regstration;

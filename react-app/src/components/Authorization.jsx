import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Authorization.css';

function LoginForm({fetchTracks}) {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(username, password);
      fetchTracks()
      navigate("/mainpage");
    } catch (error) {
      setError('Invalid user or password');
    }
  };

  const handleRegister = () => {
    navigate("/registration");
  };

  const handleForgotPassword = () => {
    // Логика для действия "Забыли пароль"
  };

  return (
    <div className='logPage'>
        <div className="header">
            <h1>MelodyMingle</h1>
        </div>
        <div className="container">
            <div className="login-form">
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button onClick={handleLogin} className="login-button">LOG IN</button>
                {error && <div className="error-message">{error}</div>} {/* Отображение сообщения об ошибке */}
                <div className="links">
                    <button onClick={handleRegister} className="link-button">REGISTER</button>
                    <button onClick={handleForgotPassword} className="link-button">FORGOT PASSWORD</button>
                </div>
            </div>
        </div>
        <div className="music-bar">
             <div className="image"></div>
        </div>
    </div>
  );
}

export default LoginForm;

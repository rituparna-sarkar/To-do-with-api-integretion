import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch(login(username));
    }
  };

  return (
    <form onSubmit={handleLogin} className="task-input-form">
      <input
        type="text"
        value={username}
        placeholder="Enter your name"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

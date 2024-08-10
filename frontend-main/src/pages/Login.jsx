import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Updated import
// import { Button } from 'antd';
// import { login } from '../services/authService';
import '../style/LoginStyle.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Updated hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /\.26@dartmouth\.edu$/; // Regular expression to check the email pattern
    if (!emailPattern.test(form.email)) {
      setError('Email must end with .26@dartmouth.edu');
      return;
    }
    try {
    //   await login(form);
      fetch('http://localhost:5000/logging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.email),
      });
      console.log('logging in');
      navigate('/recruiting'); // Updated navigation
    } catch {
      console.log('failed log in');
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">
            Email:
            <input
              type="email"
              id="email"
              name="email"
              style={{ marginLeft: '14px', alignItems: 'center', justifyContent: 'center' }}
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password:
            <input
              type="password"
              id="password"
              name="password"
              style={{ marginLeft: '14px', alignItems: 'center', justifyContent: 'center' }}
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        {error && <p className="error">{error}</p>}
        <button className="login-submit-button" type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

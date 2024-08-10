import React from 'react';
// import Stack from '@mui/material/Stack';
import { Button, Flex } from 'antd';
// import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import '../style/LandingPageStyle.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleClickRegister = () => {
    navigate('/register');
  };

  const handleClickLogin = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page-container">
      <div className="landing-page-header">
        <h1>Welcome to Tindar</h1>
      </div>
      <div className="register-login-buttons">
        <Flex gap="large" wrap>
          <Button onClick={handleClickLogin} type="primary">Login</Button>
          <Button onClick={handleClickRegister}>Register</Button>
        </Flex>
      </div>
      {/*
      <div className="about-us">
        <div className="header">
          <Divider style={{ fontSize: 50, marginTop: 50 }} plain>About Us</Divider>
        </div>
        <p>blah blah blah blah blah</p>
      </div> */}
    </div>
  );
}

export default LandingPage;

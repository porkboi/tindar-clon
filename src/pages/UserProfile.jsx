import React from 'react';
import { Image } from 'antd';
import NavBar from '../components/NavBar';
import '../style/UserProfileStyle.css';

function UserProfile() {
  return (
    <div className="profile-container">
      <h1>Your profile</h1>
      <Image src="https://via.placeholder.com/150" />
      <NavBar />
    </div>
  );
}

export default UserProfile;

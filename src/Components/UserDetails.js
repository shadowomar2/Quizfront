
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./UD.css"; 
import Lottie from "react-lottie";
import animationData from "../loading-animation.json";  
const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const id = useParams().id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://reqres.in/api/users/${id}`);
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData();
  }, [id]);

  if (!userData) {
    return <Lottie
        height={400} width={400} 
        style={{ padding: '60px' }}
      options={{
        loop: true,
        autoplay: true,
        animationData: animationData, // Replace with your animationData variable
      }}
  
    />
  }

  return (
    <div className="user-details-container">
      <h1 className="user-details-title">User Details</h1>
      <div className="user-avatar">
        <img src={userData.data.avatar} alt="User Avatar" />
      </div>
      <p className="user-detail">ID: {userData.data.id}</p>
      <p className="user-detail">Email: {userData.data.email}</p>
      <p className="user-detail">First Name: {userData.data.first_name}</p>
      <p className="user-detail">Last Name: {userData.data.last_name}</p>
      <p className="user-detail">Support URL: {userData.support.url}</p>
      <p className="user-detail">Support Text: {userData.support.text}</p>

      <Link to="/" className="back-button">
        <i className="fas fa-arrow-left"></i> Go Back
      </Link>
    </div>
  );
};

export default UserDetails;

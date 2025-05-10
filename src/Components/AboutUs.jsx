import React, { useEffect, useState } from 'react';
import './AboutUs.css';
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AboutUs = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animation trigger
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <>
      <Navbar page="aboutus" />
      <div className={`about-us-container ${visible ? 'fade-in' : ''}`}>
        <h1>About Us</h1>
        <p>
  Welcome to our Learning Management System (LMS). We're here to help you grow and succeed.
  If you have any questions, feel free to reach out!
</p>

<h3>Developers:</h3>
<ul>
  <li>2300031301 - Lahari</li>
  <li>2300031357 - Mohith Kumar</li>
  <li>2300032333 - Shravya</li>
</ul>

        <div className="contact-info">
          <div className="info-box">
            <h3>Email</h3>
            <p>contact@lmsplatform.com</p>
          </div>
          <div className="info-box">
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
          </div>
          <div className="info-box">
            <h3>Address</h3>
            <p>123, Knowledge Park, Hyderabad, Telangana, India</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;

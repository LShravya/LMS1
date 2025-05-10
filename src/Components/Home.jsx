import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "./UserContext";
import Navbar from "./Navbar";
import {
  faGraduationCap,
  faAward,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./css/style.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar page="home" />
      
      <section id="home">
        <h2>Welcome</h2>
        <p>
          Unlock the future of education with our powerful Learning Management System (LMS) – a smart, user-friendly platform designed to streamline course delivery, student engagement, and performance tracking. From interactive lessons to real-time assessments, our LMS makes learning accessible anytime, anywhere. Empower educators and inspire learners with seamless digital experiences.
        </p>
        <div className="btn">
          <a className="yellow" href="#features">
            Awesome Features
          </a>
        </div>
      </section>

      <section id="features">
        <h1>Awesome Features</h1>
        <div className="features-container">
          <div className="fea-box">
            <FontAwesomeIcon icon={faStar} className="i" />
            <h3>Valuable Courses</h3>
            <p>Explore industry-relevant courses designed to boost your skills and career potential.</p>
          </div>
          <div className="fea-box">
            <FontAwesomeIcon icon={faAward} className="i" />
            <h3>Global Certification</h3>
            <p>Earn globally recognized certifications that validate your expertise and open doors worldwide.</p>
          </div>
        </div>
        <hr />
      </section>
    </div>
  );
}

export default Home;

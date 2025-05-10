import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChalkboardUser,
  faMicrophone
} from "@fortawesome/free-solid-svg-icons";

function Navbar(props) {
  const value = props.page;
  const navigate = useNavigate();
  const authToken = localStorage.getItem("token");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
  };

  const handleCommand = (transcript) => {
    const command = transcript.toLowerCase();

    if (command.includes("home")) {
      speak("Navigating to home.");
      navigate("/");
    } else if (command.includes("courses")) {
      speak("Opening courses.");
      navigate("/courses");
    } else if (command.includes("about")) {
      speak("Opening about us.");
      navigate("/about");
    } else if (command.includes("profile")) {
      speak("Opening profile.");
      navigate("/profile");
    } else if (command.includes("learnings")) {
      speak("Opening your learnings.");
      navigate("/learnings");
    } else if (command.includes("sign out") || command.includes("logout")) {
      speak("Signing you out.");
      handleLogOut();
    } else if (command.includes("hello")) {
      speak("Hello! How can I assist you?");
    } else {
      speak("Sorry, I did not understand that.");
    }
  };

  const handleVoiceCommand = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser does not support Speech Recognition. Please use Chrome.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      console.log("Voice recognition started...");
      speak("Listening. Please say a command.");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("You said:", transcript);
      handleCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
      speak("There was an error with voice recognition.");
    };

    recognition.onend = () => {
      console.log("Voice recognition ended.");
    };

    recognition.start();
  };

  return (
    <div>
      <nav>
        <div className="logo1">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navigation">
          <div id="menu-btn">
            <div className="menu-dash" onClick={toggleMobileMenu}>
              &#9776;
            </div>
          </div>
          <i id="menu-close" className="fas fa-times" onClick={closeMobileMenu}></i>
          <ul className={isMobileMenuOpen ? "active" : ""}>
            {isMobileMenuOpen && (
              <li className="close-button">
                <button onClick={closeMobileMenu}>X</button>
              </li>
            )}
            <li className={value === "home" ? "active-link" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li className={value === "courses" ? "active-link" : ""}>
              <Link to="/courses">Courses</Link>
            </li>
            <li className={value === "about" ? "active-link" : ""}>
              <Link to="/aboutus">About Us</Link>
            </li>
            {authToken && (
              <>
                <li className={value === "profile" ? "active-link" : ""}>
                  <Link to="/profile">
                    Profile <FontAwesomeIcon icon={faUser} />
                  </Link>
                </li>
                <li className={value === "learnings" ? "active-link" : ""}>
                  <Link to="/learnings">
                    Learnings <FontAwesomeIcon icon={faChalkboardUser} />
                  </Link>
                </li>
              </>
            )}
            {authToken ? (
              <li>
                <button onClick={handleLogOut} className="sign-out-button">Sign Out</button>
              </li>
            ) : (
              <li>
                <button onClick={() => navigate("/login")}>Login/SignUp</button>
              </li>
            )}
            <li>
              <button
                onClick={handleVoiceCommand}
                title="Start Voice Command"
                style={{ background: 'transparent', border: 'none' }}
              >
                <FontAwesomeIcon icon={faMicrophone} style={{ fontSize: "20px", color: "purple" }} />
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

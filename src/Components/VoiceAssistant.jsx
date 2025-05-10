import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant = ({ isActive }) => {
  const recognitionRef = useRef(null);
  const isRecognizingRef = useRef(false);
  const navigate = useNavigate();
  const lastCommandTimeRef = useRef(0);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      synth.cancel();
      synth.speak(utterance);
    }
  };

  const handleCommand = (command) => {
    const currentTime = Date.now();
    if (currentTime - lastCommandTimeRef.current < 1000) return;
    lastCommandTimeRef.current = currentTime;

    const cmd = command.toLowerCase().trim();
    console.log("Handling command:", cmd);

    if (cmd.includes("home")) {
      speak("Opening home.");
      navigate("/");
    } else if (cmd.includes("courses")) {
      speak("Showing courses.");
      navigate("/courses");
    } else if (cmd.includes("profile")) {
      speak("Opening profile.");
      navigate("/profile");
    } else if (cmd.includes("learnings")) {
      speak("Opening your learnings.");
      navigate("/learnings");
    } else if (cmd.includes("sign out") || cmd.includes("logout")) {
      speak("Signing you out.");
      localStorage.clear();
      navigate("/");
    } else if (cmd.includes("hello")) {
      speak("Hello! How can I help you today?");
    } else {
      speak("Sorry, I didn't understand that.");
    }
  };

  const startRecognition = () => {
    if (recognitionRef.current && !isRecognizingRef.current) {
      try {
        recognitionRef.current.start();
        isRecognizingRef.current = true;
        console.log("Voice recognition started");
      } catch (e) {
        console.warn("Recognition already started");
      }
    }
  };

  const stopRecognition = () => {
    if (recognitionRef.current && isRecognizingRef.current) {
      recognitionRef.current.stop();
      isRecognizingRef.current = false;
      console.log("Voice recognition stopped");
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition API not supported.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      console.log("You said:", transcript);
      handleCommand(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      isRecognizingRef.current = false;
    };

    recognition.onend = () => {
      console.log("Voice recognition ended.");
      isRecognizingRef.current = false;
      if (isActive) {
        setTimeout(() => startRecognition(), 200); // quick restart
      }
    };

    recognitionRef.current = recognition;

    if (isActive) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
        startRecognition();
      }).catch((err) => {
        console.error("Microphone permission denied:", err);
      });
    }

    return () => {
      stopRecognition();
    };
  }, [isActive]);

  return null;
};

export default VoiceAssistant;

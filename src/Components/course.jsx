import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { Progress, Button, Modal } from "antd";
import './Course.css';

const Course = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const [course, setCourse] = useState({
    course_name: "",
    instructor: "",
    price: null,
    description: "",
    y_link: "",
    p_link: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [duration, setDuration] = useState(null);
  const [played, setPlayed] = useState(0);
  const [changePlayed, setChangePlayed] = useState(0);
  const [userId] = useState(localStorage.getItem("id"));
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const courseId = location.pathname.split("/")[2];
  const playerRef = useRef(null);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCourse();
  }, [courseId]);

  const handleDuration = () => {
    const durationVal = playerRef.current?.getDuration();
    setDuration(durationVal);
    if (durationVal) {
      fetch("http://localhost:8080/api/progress/update-duration", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          courseId,
          duration: durationVal,
        }),
      });
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/api/progress/${userId}/${courseId}`)
      .then((response) => response.json())
      .then((data) => {
        setPlayed(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [userId, courseId]);

  useEffect(() => {
    const updateProgress = async () => {
      if (courseId && userId) {
        try {
          const response = await fetch("http://localhost:8080/api/progress/update-progress", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              courseId,
              playedTime: played,
              duration,
            }),
          });

          if (response.ok) {
            setPlayed(changePlayed < played ? played : changePlayed);
          } else {
            console.error("Error updating progress:", response.statusText);
          }
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      }
    };
    updateProgress();
  }, [changePlayed, courseId, userId, played, duration]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;

  const progressPercent = duration ? Math.ceil((played / duration) * 100) : 0;

  return (
    <div className="course-container">
      <h3 className="course-header">
        The Complete {course.course_name} Course
      </h3>
      <div className="course-content">
        <div className="course-video-info">
          <ReactPlayer
            ref={playerRef}
            onProgress={(progress) => {
              if (changePlayed + 10 <= progress.playedSeconds) {
                setChangePlayed(progress.playedSeconds);
              }
            }}
            url={course.y_link}
            controls
            width="60%"
            height="440px"
            onDuration={handleDuration}
            className="course-video"
          />
          <div className="course-info">
            <h4>Test your knowledge here</h4>
          <button
  className="enroll-button"
  onClick={() => navigate(`/assessment/${course.course_id}`)}
>
  Quizz
</button>

          </div>
        </div>

        <h4 className="course-description">
          Description: <span>{course.description}</span>
        </h4>
        <p className="course-summary">
          This online programming course provides a comprehensive introduction...
        </p>
        <h4>Instructor: {course.instructor}</h4>
        <h4>Content type: Video</h4>

        <button className="enroll-button" onClick={() => navigate("/learnings")}>
          Back
        </button>
      </div>

      <div className="progress-report">
        <div className="progress-section">
          <h3 className="section-title">Progress:</h3>
          <Progress percent={progressPercent} status="active" showInfo={false} />
        </div>
        <div className="report-section">
          <h3 className="section-title">Report:</h3>
          <p className="completion-text">
            You have completed <span className="completion-percent">{progressPercent}%</span> of this course.
          </p>
        </div>
      </div>

      <Modal title="Complete the course first!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>You need to watch at least 98% of the video to take the quiz.</p>
      </Modal>
    </div>
  );
};

export default Course;

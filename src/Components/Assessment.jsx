import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal } from 'antd';
import axios from 'axios';

function Assessment() {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.pathname.split("/")[2];

  const [test, setTest] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [totalQsns, setTotalQsns] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:8080/api/questions/${courseId}`)
      .then(res => res.json())
      .then(res => {
        setTest(res);
        setTotalQsns(res.length);
        setSelectedAnswers(new Array(res.length).fill("")); // initialize with empty strings
      })
      .catch(error => console.error("Error fetching data:", error));
  }, [courseId]);

  const handleRadioChange = (questionIndex, selectedOption) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    const qsn = test[questionIndex];

    const previouslyCorrect = updatedSelectedAnswers[questionIndex] === qsn.answer;
    updatedSelectedAnswers[questionIndex] = selectedOption;
    const nowCorrect = selectedOption === qsn.answer;

    let newCorrectCount = correctCount;
    if (!previouslyCorrect && nowCorrect) {
      newCorrectCount += 1;
    } else if (previouslyCorrect && !nowCorrect) {
      newCorrectCount -= 1;
    }

    setCorrectCount(newCorrectCount);
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleMarks = () => {
    const data = {
      courseId: courseId,
      userId: localStorage.getItem("id"),
      marks: (correctCount / totalQsns) * 100
    };

    axios.post(`http://localhost:8080/api/assessments/add/${data.userId}/${courseId}`, data)
      .then(response => {
        console.log('Request successful:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = () => {
    handleMarks();
    setOpenModal(true);
  };

  const handleOk = () => {
    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const message = correctCount / totalQsns >= 0.5
    ? "🎉 Congratulations, you passed!"
    : "❌ You did not pass. Try again!";

  return (
    <div className="assessment-container">
      <div style={{ display: 'flex' }}>
        <button
          type="submit"
          id="backbtn"
          className="submit-button"
          onClick={() => navigate(`/course/${courseId}`)}
        >
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <h1
          className="assessment-title"
          style={{
            backgroundColor: 'darkblue',
            marginLeft: '440px',
            width: '26%',
            color: "white",
            borderRadius: "25px",
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          Assessment Questions
        </h1>
      </div>

      <div className="assessment-form">
        {test.map((question, index) => (
          <div
            key={question.no}
            style={{
              padding: "10px",
              backgroundColor: "rgb(454, 225, 180)",
              marginTop: "10px",
              borderRadius: "18px"
            }}
          >
            <h3>{question.question}</h3>
            {[question.option1, question.option2, question.option3, question.option4].map((option, i) => (
              <label key={i} className="option" style={{ display: 'block', marginLeft: "20px" }}>
                <input
                  type="radio"
                  name={`question_${index}`} // FIXED: unique per question
                  value={option}
                  onChange={() => handleRadioChange(index, option)}
                  checked={selectedAnswers[index] === option}
                />{" "}
                {option}
              </label>
            ))}
          </div>
        ))}

        <div style={{ padding: '20px 0 0 0' }}>
          <button
            onClick={() => navigate(0)}
            className="submit-button"
            style={{ marginLeft: "30px", padding: "5px 15px" }}
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            className="submit-button11"
          >
            Submit
          </button>
        </div>
      </div>

      <Modal
        id="popup"
        open={openModal}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ padding: "10px" }}
      >
        <h2 style={{ color: 'darkblue' }}>Assessment Result</h2>
        <h1 style={{ textAlign: "center" }}>{message}</h1>
        <h3 style={{ display: 'flex', justifyContent: 'center' }}>
          You scored {(correctCount / totalQsns) * 100}%
        </h3>
      </Modal>
    </div>
  );
}

export default Assessment;

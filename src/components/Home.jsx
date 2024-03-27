import React, { useState, useEffect } from "react";
import reactData from "../constants/reactjs.json";
import nodeData from "../constants/nodejs.json";
import { addResult } from "../services/results";
import { userSelector } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const [quizIndex, setQuizIndex] = useState(-1);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [selectedQuiz, setSelectedQuiz] = useState(""); 
  const [quizData, setQuizData] = useState([]); 
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option for the current question
  const user = useSelector(userSelector);
  const navigate = useNavigate();

  useEffect(() => {
    switch (selectedQuiz) {
      case "javascript":
        setQuizData(quizData);
        break;
      case "react":
        setQuizData(reactData);
        break;
      case "nodejs":
        setQuizData(nodeData);
        break;
      default:
        setQuizData([]);
        break;
    }
  }, [selectedQuiz]);

  const startQuiz = () => {
    setQuizIndex(0);
    setStartTime(Date.now());
    setSelectedOption(null);
  };

  const handleNextQuestion = () => {
    if (userAnswers.length === quizIndex) {
      setError("Please select an answer.");
    } else {
      setError("");
      setQuizIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    }
  };

  const handleAnswer = (selectedOption) => {
    setUserAnswers((prevAnswers) => [...prevAnswers, selectedOption]);
    setSelectedOption(selectedOption);
  };

  useEffect(() => {
    let timer;
    if (quizIndex !== -1 && quizIndex < quizData.quiz.length) {
      timer = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        setTimeLeft(Math.max(0, 600 - elapsedTime));
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [startTime, quizIndex]);

  const renderQuestion = () => {
    const currentQuiz = quizData.quiz[quizIndex];
    return (
      <div>
        <h3>Question {quizIndex + 1}</h3>
        <p>{currentQuiz.question}</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {currentQuiz.options.map((option, index) => (
            <li key={index}>
              <label>
              {index + 1}.
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  checked={selectedOption === index}
                  onChange={() => handleAnswer(index)}
                />
                 {option}
              </label>
            </li>
          ))}
        </ul>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleNextQuestion}>Next Question</button>
      </div>
    );
  };

  const calculateScore = () => {
    let score = 0;
    quizData.quiz.forEach((quiz, index) => {
      if (quiz.correctAnswer === userAnswers[index]) {
        score++;
      }
    });
    return score;
  };

  const submitQuiz = async () => {
    const totalCorrectAnswers = calculateScore();
    const totalAnswers = userAnswers.length;
    const userId = user._id;
    const data = {
      quizName: selectedQuiz,
      totalCorrectAnswers,
      totalAnswers,
      userId,
      userAnswers,
    };
    try {
      const response = await addResult(data);
      if (response.status === 201) {
        setIsSubmitted(true); 
        navigate("/");
      }
      console.log(response, "resss");
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedQuiz(event.target.value);
  };

  return (
    <div>
      <h4>Welcome to home page {user.username}!</h4>
      {!selectedQuiz && (
        <div>
          <h2>Select a Quiz:</h2>
          <select value={selectedQuiz} onChange={handleSelectChange}>
            <option value="">Select a Quiz</option>
            <option value="javascript">JavaScript Quiz</option>
            <option value="react">React Quiz</option>
            <option value="nodejs">Nodejs Quiz</option>
          </select>
        </div>
      )}
      {selectedQuiz && (
        <>
          <h2>{selectedQuiz.toUpperCase()} Quiz [10 Marks]</h2>
          {quizIndex === -1 ? (
            <button onClick={startQuiz}>Start Quiz</button>
          ) : (
            <>
              <div>
                {quizIndex < quizData.quiz.length ? (
                  renderQuestion()
                ) : (
                  <div>
                    <h2>Quiz Completed!</h2>
                    <p>Total Correct Answers: {calculateScore()}</p>
                    <p>Total Questions: {userAnswers.length}</p>
                    <button onClick={submitQuiz} disabled={isSubmitted}>Submit Quiz</button>
                  </div>
                )}
              </div>
              <div>
                Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;

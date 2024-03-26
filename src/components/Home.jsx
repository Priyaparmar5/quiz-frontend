import React, { useState, useEffect } from 'react';
import quizData from '../constants/quiz-question.json';
import { addResult } from '../services/results';

function Home() {
  const [quizIndex, setQuizIndex] = useState(-1);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); 
  const [error, setError] = useState('');

  const startQuiz = () => {
    setQuizIndex(0);
    setStartTime(Date.now());
  };

  const handleNextQuestion = () => {
    if (userAnswers.length === quizIndex) {
      setError('Please select an answer.');
    } else {
      setError('');
      setQuizIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleAnswer = (selectedOption) => {
    setUserAnswers(prevAnswers => [...prevAnswers, selectedOption]);
  };

  // const getCurrentQuizId = () => {
  //   return quizData.quiz[quizIndex].id; 
  // };

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
        <h3>{currentQuiz.question}</h3>
        <ul>
          {currentQuiz.options.map((option, index) => (
            <li key={index}>
              <label>
                <input
                  type="radio"
                  name="answer"
                  value={index}
                  onChange={() => handleAnswer(index)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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

  const submitQuiz =async () => {
    const response = await addResult(userAnswers); 
console.log(response,"Ress");
  };

  return (
    <div>
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
                <button onClick={submitQuiz}>Submit Quiz</button>
              </div>
            )}
          </div>
          <div>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
        </>
      )}
    </div>
  );
}

export default Home;

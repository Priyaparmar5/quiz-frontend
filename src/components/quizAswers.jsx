import React from 'react';
import javascriptData from '../constants/javascript.json';
import reactData from "../constants/reactjs.json";
import nodejsData from "../constants/nodejs.json";

function QuizAnswers({ result }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const handleBack = () => {
    window.history.back();
  };

  const getAnswerOption = (question, answerIndex) => {
    return question.options[answerIndex];
  };

  let quizData;
  switch (result.quizName) {
    case "javascript":
      quizData = javascriptData;
      break;
    case "react":
      quizData = reactData;
      break;
    case "nodejs":
      quizData = nodejsData;
      break;
    default:
      quizData = null;
  }

  return (
    <div>
      <h3>Quiz Result</h3>
      <p>Quiz: {result.quizName}</p>
      <p>Date: {formatDate(result.date)}</p>
      <p>Score: {result.score}</p>
      <h4>Answers:</h4>
      <ul>
        {quizData && quizData.quiz.map((question, qIndex) => (
          <li key={qIndex} style={{ color: result.answers[qIndex] === question.correctAnswer ? 'green' : 'red' }}>
            Question {qIndex + 1}: {question.question}<br />
            Your Answer: {getAnswerOption(question, result.answers[qIndex])}<br />
            Correct Answer: {question.options[question.correctAnswer]}
          </li>
        ))}
      </ul>
      <button onClick={handleBack}>Back</button>
    </div>
  );
}

export default QuizAnswers;

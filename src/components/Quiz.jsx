import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Quiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // Fetch quiz data from backend using quiz ID
  }, [id]);

  return (
    <div>
      {quiz ? (
        <div>
          <h2>{quiz.title}</h2>
          <p>Instructions: Answer the following questions</p>
          {quiz.questions.map((question, index) => (
            <div key={index}>
              <h3>Question {index + 1}</h3>
              <p>{question.question}</p>
              <ul>
                {question.options.map((option, i) => (
                  <li key={i}>{option}</li>
                ))}
              </ul>
            </div>
          ))}
          <button>Submit Quiz</button>
        </div>
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
}

export default Quiz;

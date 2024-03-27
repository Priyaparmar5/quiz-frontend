import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/slices/authSlice";
import { getResult } from "../services/results";
import QuizResultRow from "./quiz-result-show";
import QuizAnswers from "./quizAswers";

function QuizResults() {
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const user = useSelector(userSelector);

  useEffect(() => {
    fetchQuizResults();
  }, []);

  const fetchQuizResults = async () => {
    try {
      const response = await getResult(user._id);
      console.log(response,"resssssssssss");
      setResults(response.data.results);
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    }
  };

  const onViewAnswers = (result) => {
    setSelectedResult(result);
  };

  const renderQuizResults = () => {
    if (results.length === 0) {
      return <p>No data here.</p>;
    }
  
    return (
      <table className="quiz-table">
        {" "}
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Date</th>
            <th>Quiz Name</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <QuizResultRow
              key={index}
              result={result}
              index={index}
              onViewAnswers={onViewAnswers}
            />
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h2>Quiz Results</h2>
      {selectedResult ? (
        <QuizAnswers result={selectedResult} />
      ) : (
        renderQuizResults()
      )}
    </div>
  );
}

export default QuizResults;

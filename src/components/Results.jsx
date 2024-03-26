import React, { useState, useEffect } from 'react';

function Results() {
  const [results, setResults] = useState([]);

  // useEffect(() => {
  // }, []);

  return (
    <div>
      <h2>Quiz Results</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Quiz</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.date}</td>
              <td>{result.quiz}</td>
              <td>{result.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Results;

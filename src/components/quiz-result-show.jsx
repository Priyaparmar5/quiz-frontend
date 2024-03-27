import React from 'react';

function QuizResultRow({ result, index, onViewAnswers }) {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{formatDate(result.date)}</td>
      <td>{result.quizName||'-'}</td>
      <td>{result.score|| '-'}</td>
      <td>
        <button onClick={() => onViewAnswers(result)}>View Answers</button>
      </td>
    </tr>
  );
}

export default QuizResultRow;

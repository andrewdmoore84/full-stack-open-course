import React from 'react';

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((total, part) => total += part.exercises, 0);

  return (
    <p>
      <strong>total of {totalExercises} exercises</strong>
    </p>
  );
};

export default Total;

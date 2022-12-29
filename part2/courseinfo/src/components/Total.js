import React from "react";

// Total 组件，显示练习总数
const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    return { exercises: s.exercises + p.exercises };
  });

  return <p>Number of exercises {total.exercises}</p>;
};

export default Total;

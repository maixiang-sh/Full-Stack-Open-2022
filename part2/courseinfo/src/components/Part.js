import React from "react";

// Part 组件，显示 part 名称和 练习数量
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

export default Part;

import React from "react";
// 这里导入的路径是相对路径，所以是 ./Part，不能写成 ./components/Part
import Part from "./Part";

// Content 组件，显示多个 Part
const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

export default Content;

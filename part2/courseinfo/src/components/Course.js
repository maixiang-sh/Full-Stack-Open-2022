import React from "react";
// 导入需要的组件
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

// MARK: 2.1: Course information step6
// 定义一个负责格式化单一课程的组件，称为 Course。
const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      {/* 
        因为这里 parts 属性写错了，没有和 Total 的 props 名称一致，导致报错
        Cannot read properties of undefined (reading 'reduce')
        */}
      <Total parts={course.parts} />
    </>
  );
};

export default Course;

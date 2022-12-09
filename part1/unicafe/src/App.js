import { useState } from "react";
// Button 组件
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
// StatisticLine 组件
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
// Statistics 组件
const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  const Head = () => <h1>Statistics</h1>;
  if (all > 0) {
    return (
      <>
        <Head />
        {/* 这里需要加 <table> <tbody> 标签，否则会报错 */}
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={`${positive * 100}%`} />
          </tbody>
        </table>
      </>
    );
  }
  return (
    <>
      <Head />
      <p>No feedback given</p>
    </>
  );
};


function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedback = () => setGood(good + 1);
  const neutralFeedback = () => setNeutral(neutral + 1);
  const badFeedback = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all;
  const positive = good / all;

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodFeedback} text="good" />
      <Button onClick={neutralFeedback} text="neutral" />
      <Button onClick={badFeedback} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  );
}

export default App;

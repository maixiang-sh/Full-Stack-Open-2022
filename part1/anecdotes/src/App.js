import { useState } from "react";
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [candidate, setVotes] = useState({});
  // 随机index
  const shuffle = () => {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  };
  // 投票
  const vote = () => {
    // copy useState 中的对象
    const copy = { ...candidate };
    // 判断 key 是否存在
    if (copy[selected] == null) {
      // 如果不存在，则设置 value = 1
      copy[selected] = 1;
    } else {
      // 如果存在，则设置 value += 1
      copy[selected] += 1;
    }
    // 更新 useState 对象，替换为 copy
    setVotes(copy);
  };
  // 返回投票数最多的index
  const mostVote = () => {
    let maxValue = 0;
    let mostVoteIndex = 0;
    for (const [key, value] of Object.entries(candidate)) {
      if (value != null && value > maxValue) {
        maxValue = value;
        mostVoteIndex = key;
      }
    }
    return { index: mostVoteIndex, vote: maxValue };
  };

  return (
    <div>
      <h1>anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        has {candidate[selected] == null ? 0 : candidate[selected]} votes
      </div>
      <div>
        <Button onClick={vote} text="vote" />
        <Button onClick={shuffle} text="next anecdote" />
      </div>
      <h1>anecdote with most votes</h1>
      {anecdotes[mostVote().index]}
      <div>has {mostVote().vote} votes</div>
    </div>
  );
};

export default App;

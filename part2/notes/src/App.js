import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  // 传入到 App 的 note 数据（显示在网页上）
  const [notes, setNotes] = useState([]);
  // 用来储存用户新增提交的 note
  const [newNote, setNewNote] = useState("");
  // 用来确定是否显示所有 note
  const [showAll, setShowAll] = useState(true);
  // 储存提示信息
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const addNote = (event) => {
    // event.preventDefault() 会阻止默认点击事件的执行，例如以下默认行为：
    // - 点击 checkbox 会显示选中
    // - 点击 超链接 会跳转
    // - 点击 submit 会刷新页面
    // 当执行event.preventDefault()方法时，以上行为不会发生。
    // 这里调用，主要原因是为了避免 submit 后页面刷新
    event.preventDefault();
    // 创建一个新的 note 对象
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    // 调用 "./services/notes" 中的方法 create() 在服务器新增 note
    // 更新 notes ，重置 newNote
    noteService.create(noteObject).then((returnedNotes) => {
      setNotes(notes.concat(returnedNotes));
      setNewNote("");
    });
  };

  //  切换 note 的 Importance 属性
  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    // 这里使用了传播语法 Spread syntax (...) ，创建了一个新的，更新指定属性值的 note
    const changedNote = { ...note, important: !note.important };
    // 调用 "./services/notes" 中的方法 update() 更新服务器数据，并更新客户端数据
    noteService
      .update(id, changedNote)
      .then((returnedNotes) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNotes)));
      })
      // 如果抛出错误，更新 ErrorMessage 值，此时 Notification 组件由于引用了 ErrorMessage 的值，组件会被刷新，html 显示错误内容
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        // 设置一个定时器，5000 毫秒( 5 秒) 后 将 ErrorMessage 重置为 null，html 错误提示将消失
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        // 因为服务器已经找不到这个 Note 了。所以更新本地的 Notes，将 那个 Note 剔除
        setNotes(note.filter((n) => n.id !== id));
      });
  };

  const handleNoteChange = (event) => {
    // event.target 表示触发事件的对象，也就是下方的 input 标签，.value 表示 input 的值
    // 这里不需要调用 event.preventDefault()，因为 input 输入框的值发生变化时，并没有默认行为
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  // 根据 showAll 变量 返回需要显示的 notes，如果是 true 返回 notes ，否则返回 notes 筛选重要 note
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        {/* button 点击执行 showAll 值取反*/}
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      {/*单击提交按钮提交表单时将调用 addNote 函数。*/}
      <form onSubmit={addNote}>
        {/* 当 input 的值 发生变化时，调用 handleNoteChange 函数，同步修改 useState 的值 */}
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;

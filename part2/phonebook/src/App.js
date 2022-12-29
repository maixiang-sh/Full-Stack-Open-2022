import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import phonebookService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  // 搜索关键词
  const [searchKeywords, setSearchKeywords] = useState("");
  // 用于储存用户输入的新增 name
  const [newName, setNewName] = useState("");
  // 用于储存用户输入的新增 number
  const [newNumber, setNewNumber] = useState("");
  // 储存通知信息
  const [message, setMessage] = useState(null);
  const [messageStyle, setMessageStyle] = useState("notif-normal");

  // 从服务器获取数据，处理响应并更新到 Persons (useEffect 需要 2 个参数，第一个是函数，第二个是空数组，表示仅执行一次
  useEffect(() => {
    phonebookService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  // MARK: 添加 Person
  const addPerson = (event) => {
    // 禁止 button 点击事件默认行为
    event.preventDefault();
    // 2.7: The Phonebook Step2 使用 Array.some() 方法 检查数组是否包含某个对象
    if (
      persons.some(
        (person) => person.name === newName && person.number === newNumber
      )
    ) {
      //
      alert(`${(newName, newNumber)} is already added to phonebook`);
      return;
    }

    if (
      persons.some(
        (person) => person.name === newName && person.number !== newNumber
      )
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook,replace the old number with a new one?`
        )
      ) {
        const id = persons.find((person) => person.name === newName).id;
        updatePerson(id, newNumber);
        return;
      }
    }
    // 使用 input 输入的内容 创建一个 person 对象
    const person = { name: newName, number: newNumber };
    // 更新服务器数据 和本地 persons 数据
    phonebookService.create(person).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      // 重置 input 的值
      setNewName("");
      setNewNumber("");
      setMessageStyle("notif-success");
      setMessage(`Added ${returnedPerson.name}`);
      setTimeout(() => setMessage(null), 5000);
    });
  };

  // MARK: 更新 person
  const updatePerson = (id, newNumber) => {
    const person = persons.find((person) => person.id === id);
    const changedPerson = { ...person, number: newNumber };
    phonebookService
      .update(id, changedPerson)
      .then((returnedPerson) =>
        setPersons(
          persons.map((person) => (person.id === id ? returnedPerson : person))
        )
      )
      .catch((error) => {
        setMessageStyle("notif-danger")
        setMessage(
          `Information of ${person.name} has already been removed from server `
        );
        setTimeout(() => setMessage(null), 5000);
        setPersons(persons.filter((person) => person.id !== id));
      });
  };

  // MARK: 删除 pesron
  const removePerson = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      phonebookService.remove(id).then((response) => {
        if (response.status === 200) {
          setPersons(persons.filter((person) => person.id !== id));
        }
      }).catch((error) => {
        setMessageStyle("notif-danger")
        setMessage(
          `Information of ${name} has already been removed from server `
        );
        setTimeout(() => setMessage(null), 5000);
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  // name input 的值发生变更时，同步更新到 newName
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  // number input 的值发生变更时，同步更新到 newNumber
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  // search input 的值发生变更时，同步更新到 searchKeywords
  const handleSearchKeywordsChange = (event) => {
    setSearchKeywords(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageStyle={messageStyle} />
      <Filter
        searchKeywords={searchKeywords}
        handleSearchKeywordsChange={handleSearchKeywordsChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      {persons
        .filter((person) => person.name.toLowerCase().includes(searchKeywords))
        .map((person) => (
          <Person
            key={person.id}
            person={person}
            handleDelete={() => removePerson(person.id, person.name)}
          />
        ))}
    </div>
  );
};

export default App;

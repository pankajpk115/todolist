import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [add, setAdd] = useState('');
  const [list, setList] = useState([]);

  // Load data from local storage on component mount
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('todoList')) || [];
    setList(storedList);
  }, []);

  // Save data to local storage whenever the list changes
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(list));
  }, [list]);

  const addTodo = (event) => {
    event.preventDefault();
    const createdAt = new Date().toLocaleString();
    const newList = [{ content: add, createdAt, isCompleted: false }, ...list];
    setList(newList);
    setAdd('');
  };

  const delTodo = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const check = (index, event) => {
    const newList = [...list];
    newList[index].isCompleted = event.target.checked;
    setList(newList);
  };

  return (
    <div className='main'>
    <aside>
      <h1>FOR ADVERTISEMENT</h1>
    </aside>
      <div className="root">
        <h1>TO DO LIST</h1>
        <div className="hero">
          <div>
            <form className="add">
              <input type="text" className="hero-input" onChange={(event) => setAdd(event.target.value)} value={add} />
              <button className="add-btn" onClick={addTodo}>
                ADD
              </button>
            </form>
          </div>
        </div>
        <div>
          {list.map(({ content, createdAt, isCompleted }, index) => (
            <div key={index} className={`todo-container ${isCompleted ? 'completed' : ''}`}>
              <div className="todo-main-content">
                <div className="todo-content">{content}</div>
                <div className="todo-createdAt">Created At:{createdAt}</div>
              </div>
              <div>
                <input type="checkbox" className="todo-check" checked={isCompleted} onChange={(event) => check(index, event)} />
              </div>
              <div className="del-button" onClick={() => delTodo(index)}>
                Delete
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

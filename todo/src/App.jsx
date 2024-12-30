import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoStats from './components/TodoStat';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import './App.css';

const App = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem('todos');
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem('todos'));
      setTodos(todos);
    }
  }, []);

  const saveLs = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveLs();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });

    setTodos(newTodos);
    saveLs();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo('');
    saveLs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleChcekBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveLs();
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <div className="mx-3 md:container bg-violet-200 md:mx-auto my-5 rounded-xl p-5 min-h-[80vh] md:w-1/2">
        <div className="addTodo my-5 flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center">Plan-IT</h1>
          <TodoStats todos={todos} />
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-lg px-5 py-1"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-800 disabled:bg-violet-400 hover:bg-violet-950 p-3 py-1 text-white rounded-md text-sm font-bold"
          >
            Submit
          </button>
        </div>
        <input
          onChange={toggleFinished}
          type="checkbox"
          checked={showFinished}
        />{' '}
        Show Finshed
        <h1 className="text-lg font-bold">Your todos</h1>
        <div className="todos">
          {todos.length === 0 && (
            <div className="text-center text-2xl text-red-400 font-bold m-5">
              No todos
            </div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo flex justify-between w-1/2 my-2"
                >
                  <input
                    name={item.id}
                    onChange={handleChcekBox}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? 'line-through' : ''}>
                    {item.todo}
                  </div>
                  <div className="button flex h-full  ">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 text-sm font-bold"
                    >
                      {<CiEdit />}
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1 text-sm font-bold"
                    >
                      {<MdDelete />}
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;

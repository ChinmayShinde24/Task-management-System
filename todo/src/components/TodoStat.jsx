// components/TodoStats.js
import React from 'react';

const TodoStats = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.isCompleted).length;

  return (
    <div className=" md: w-full bg-violet-100 p-4 rounded-full shadow-md  text-center mx-auto my-5">
      {/* <h2 className="text-lg font-bold text-violet-800">Todo Statistics</h2> */}
      <p className="text-sm font-medium">
        Completed Todos: <span className="font-bold">{completedTodos}</span>
      </p>
      <p className="text-sm font-medium">
        Total Todos: <span className="font-bold">{totalTodos}</span>
      </p>
      <p className="text-sm font-medium mt-2">
        Progress:{' '}
        <span className="font-bold">{`${completedTodos}/${totalTodos}`}</span>
      </p>
    </div>
  );
};

export default TodoStats;

import React from "react";
import { FaPen } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";

function TodoList({ todos, handleDelete, handleEdit }: TodoList) {
  return (
    <div className="flex flex-col gap-5">
      {todos.map((todo) => (
        <div
          className="w-96 cursor-pointer select-none"
          key={todo.id}
          tabIndex={0}
        >
          <div className="flex items-center justify-between gap-3 rounded-md bg-slate-500 p-2 text-white transition duration-300 hover:bg-slate-600">
            <p className="overflow-hidden break-words">{todo.content}</p>
            <div className="flex cursor-pointer items-center gap-2 rounded-lg bg-slate-400/50 p-3 text-xl">
              <FaPen
                onClick={() => handleEdit(todo.id)}
                className="transition duration-300 hover:text-slate-800"
              />
              <ImCheckmark
                onClick={() => handleDelete(todo.id)}
                className="transition duration-300 hover:text-slate-800"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default TodoList;

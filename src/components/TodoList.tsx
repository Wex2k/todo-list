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
          <div className="flex items-center justify-between gap-3 rounded-md bg-white/20 p-2 text-white transition duration-300 hover:bg-white/30">
            <p className="overflow-hidden break-words">{todo.content}</p>
            <div className="flex cursor-pointer items-center gap-2 rounded-lg bg-white/60 p-3 text-xl">
              <FaPen
                onClick={() => handleEdit(todo.id)}
                className="transition duration-300 hover:text-black/80"
              />
              <ImCheckmark
                onClick={() => handleDelete(todo.id)}
                className="transition duration-300 hover:text-black/80"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default TodoList;

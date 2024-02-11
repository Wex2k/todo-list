import React from "react";
import { FaPen } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";

function TodoList({ todos, handleDelete, handleEdit }: TodoList) {
  return (
    <div>
      {todos.map((todo) => (
        <div
          className="mb-5 flex w-96 cursor-pointer select-none flex-col"
          key={todo.id}
          tabIndex={0}
        >
          <div className="flex h-fit w-full items-center justify-between rounded-lg bg-slate-500 p-3 text-white transition duration-200 hover:bg-slate-600">
            <p className="overflow-hidden break-words">{todo.content}</p>
            <div className="flex cursor-pointer items-center gap-2 text-xl">
              <FaPen onClick={() => handleEdit(todo.id)} />
              <ImCheckmark onClick={() => handleDelete(todo.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default TodoList;

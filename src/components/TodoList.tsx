import React from "react";
import type { TodoListType } from "~/pages/index";
import { AiFillEdit, AiFillCheckCircle } from "react-icons/ai";

function TodoList({ todos, handleDelete, handleEdit }: TodoListType) {
  return (
    <div>
      {todos.map((todo) => (
        <div className="mb-5 flex w-96 select-none flex-col" key={todo.id}>
          <div className="flex h-16 w-full items-center justify-between rounded-lg bg-slate-500 p-3 text-white transition duration-200 hover:bg-slate-600">
            <p className="overflow-hidden break-words">{todo.content}</p>
            <div className="flex cursor-pointer items-center gap-2 text-3xl">
              <AiFillEdit onClick={() => handleEdit(todo.id)} />
              <AiFillCheckCircle onClick={() => handleDelete(todo.id)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default TodoList;

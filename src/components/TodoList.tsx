import React from "react";
import { TodoListType } from "~/pages";
import { AiFillEdit, AiFillCheckCircle } from "react-icons/ai";

function TodoList({ todos, handleDelete, handleEdit }: TodoListType) {
  return (
    <div>
      {todos.map((todo) => (
        <div className="mb-4 flex w-96 flex-row gap-4" key={todo.id}>
          <div className="flex h-16 w-full items-center justify-between gap-2 break-words rounded-lg bg-purple-400 p-3 text-white">
            <p>{todo.content}</p>
            <div className="flex items-center">
              <AiFillEdit
                className="text-3xl"
                onClick={() => handleEdit(todo.id)}
              />
              <AiFillCheckCircle
                onClick={() => handleDelete(todo.id)}
                className="text-3xl"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default TodoList;

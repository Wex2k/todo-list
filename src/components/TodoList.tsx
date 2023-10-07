import React from "react";
import { TodoListType } from "~/pages";

function TodoList({ todos, handleDelete }: TodoListType) {
  return (
    <div>
      {todos.map((todo) => (
        <div className="mb-4 flex w-96 flex-row gap-4" key={todo.id}>
          <div>
            <button
              className="rounded-md bg-purple-400 p-3 uppercase text-white drop-shadow-2xl transition duration-300 hover:bg-purple-600"
              onClick={() => handleDelete(todo.id)}
            >
              complete
            </button>
          </div>
          <div className="w-full flex-col gap-2 bg-purple-400 text-white">
            <p>{todo.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default TodoList;

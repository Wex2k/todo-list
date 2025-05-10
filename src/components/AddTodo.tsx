import { TodoContext } from "@/contexts/TodoContext/TodoContext";
import React, { useContext } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function AddTodo() {
  const { input, setInput, handleSubmit } = useContext(TodoContext)!;

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex w-full max-w-sm space-x-3"
    >
      <Input
        id="add-todo"
        type="text"
        placeholder="Add todo..."
        className="w-full rounded-md border-2 border-white/50 bg-white/20 p-2 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-0"
        onChange={(e) => setInput(e.currentTarget.value)}
        value={input}
      />
      <Button variant="secondary" className="rounded-md uppercase">
        Add todo
      </Button>
    </form>
  );
}

export default AddTodo;

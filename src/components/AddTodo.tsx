import { useTodo } from "@/contexts/TodoContext/TodoContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

function AddTodo() {
  const { input, setInput, handleSubmit } = useTodo();

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex w-full max-w-sm space-x-3"
    >
      <Input
        id="add-todo"
        type="text"
        placeholder="Add a todo..."
        onChange={(e) => setInput(e.currentTarget.value)}
        value={input}
      />
      <Button variant="outline" className="rounded-md uppercase">
        Add todo
      </Button>
    </form>
  );
}

export default AddTodo;

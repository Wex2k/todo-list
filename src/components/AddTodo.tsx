import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodo } from "@/contexts/TodoContext/TodoContext";

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

import Todo from "@/components/Todo";
import { useTodo } from "@/contexts/TodoContext/TodoContext";
import { NotebookPen } from "lucide-react";

function TodoList() {
  const { todos } = useTodo();

  return (
    <div className="mb-20 flex flex-col gap-5 sm:mb-0">
      {!!todos &&
        todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            content={todo.content}
            editing={todo.editing}
            priority={todo.priority}
          />
        ))}

      {!todos?.length && (
        <div className="flex w-96 flex-col items-center gap-2 text-center">
          <NotebookPen className="text-primary mb-2 size-52 sm:size-60" />
          <h3 className="text-foreground text-2xl font-semibold">
            Nothing here yet
          </h3>
          <p className="text-muted-foreground">What&apos;s on your mind?</p>
        </div>
      )}
    </div>
  );
}
export default TodoList;

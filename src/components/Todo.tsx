import React, { useContext, useState } from "react";
import { Input } from "./ui/input";
import { TodoContext } from "@/contexts/TodoContext/TodoContext";
import { Check, Pen, RotateCcw } from "lucide-react";
import { priorities, SelectPriority } from "@/components/SelectPriority";
import { Priority, ITodo } from "./types/todo";
import { ITodoContext } from "@/contexts/TodoContext/todo-context";

function Todo({ id, content, editing, priority: initialPriority }: ITodo) {
  const { handleEdit, handleDelete } = useContext(TodoContext) as ITodoContext;
  const [inputValueEdit, setInputValueEdit] = useState(content);
  const [priority, setPriority] = useState<Priority>(initialPriority);
  const initialContent = content;

  return (
    <div className="w-96">
      <div className="flex flex-col gap-1 rounded-md bg-white/20 p-2 text-white transition duration-300 hover:bg-white/25">
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="w-full overflow-hidden">
            {!editing ? (
              <div className="flex items-center">
                <div
                  className={`h-8 w-1.5 flex-shrink-0 rounded-md ${priorities[priority].color} mr-2`}
                />
                <p className="overflow-hidden break-words">{content}</p>
              </div>
            ) : (
              <Input
                type="text"
                name="edit-todo"
                value={inputValueEdit}
                onChange={(e) => setInputValueEdit(e.currentTarget.value)}
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEdit(id, inputValueEdit);
                }}
                className="rounded-md border-2 border-white/50 bg-white/20 p-2 text-white placeholder:text-white/50"
              />
            )}
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-white/15 p-3 text-xl *:transition *:duration-300 hover:*:cursor-pointer hover:*:text-black/60">
            {!editing && (
              <Pen
                onClick={() => handleEdit(id, inputValueEdit)}
                aria-label="Edit todo"
                aria-hidden={editing}
              />
            )}
            {editing && (
              <RotateCcw
                onClick={() => {
                  setInputValueEdit(initialContent);
                }}
                aria-label="Reset changes"
                aria-hidden={!editing}
              />
            )}
            <Check
              onClick={() => {
                editing
                  ? handleEdit(id, inputValueEdit, priority)
                  : handleDelete(id);
              }}
              aria-label={!editing ? "Delete todo" : "Save changes"}
            />
          </div>
        </div>
        {editing && (
          <SelectPriority
            key={id}
            priority={priority}
            setPriority={setPriority}
          />
        )}
      </div>
    </div>
  );
}

export default Todo;

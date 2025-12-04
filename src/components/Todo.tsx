import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useTodo } from "@/contexts/TodoContext/TodoContext";
import { Check, Pen, RotateCcw } from "lucide-react";
import { priorities, SelectPriority } from "@/components/SelectPriority";
import { Priority, ITodo } from "./types/todo";

function Todo({ id, content, editing, priority: initialPriority }: ITodo) {
  const { handleEdit, handleDelete } = useTodo();
  const [inputValueEdit, setInputValueEdit] = useState(content);
  const [priority, setPriority] = useState<Priority>(initialPriority);
  const initialContent = content;

  return (
    <div className="w-96">
      <div className="bg-card text-card-foreground flex flex-col gap-2 rounded-md border p-2">
        <div className="flex flex-row items-center justify-between gap-3">
          <div className="w-full overflow-hidden">
            {!editing ? (
              <div className="flex items-center">
                <div
                  className={`h-8 w-1.5 shrink-0 rounded-md ${priorities[priority].color} mr-2`}
                />
                <p className="overflow-hidden wrap-break-word">{content}</p>
              </div>
            ) : (
              <Input
                type="text"
                name="edit-todo"
                value={inputValueEdit}
                onChange={(e) => setInputValueEdit(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleEdit(id, inputValueEdit);
                  }
                }}
                autoFocus
              />
            )}
          </div>

          <div className="bg-muted flex items-center gap-1 rounded-md border p-1 md:p-0">
            {editing ? (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setInputValueEdit(initialContent)}
                    >
                      <RotateCcw className="size-4" />
                      <span className="sr-only">Reset changes</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Reset changes</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(id, inputValueEdit, priority)}
                    >
                      <Check className="size-4" />
                      <span className="sr-only">Save changes</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Save changes</p>
                  </TooltipContent>
                </Tooltip>
              </>
            ) : (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(id, inputValueEdit)}
                    >
                      <Pen className="size-4" />
                      <span className="sr-only">Edit todo</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit todo</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(id)}
                    >
                      <Check className="size-4" />
                      <span className="sr-only">Complete todo</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Complete todo</p>
                  </TooltipContent>
                </Tooltip>
              </>
            )}
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

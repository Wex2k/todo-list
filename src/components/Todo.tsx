import React, { useContext, useState } from "react";
import { Input } from "./ui/input";
import { TodoContext } from "@/contexts/todoContext";
import { Check, Pen } from "lucide-react";

function Todo({ id, content, editing }: Todo) {
  const { handleEdit, handleDelete } = useContext(TodoContext) as TodoContext;
  const [inputValueEdit, setInputValueEdit] = useState(content);

  return (
    <div className="w-96 cursor-pointer">
      <div className="flex items-center justify-between gap-3 rounded-md bg-white/20 p-2 text-white transition duration-300 hover:bg-white/30">
        {!editing ? (
          <p className="overflow-hidden break-words">{content}</p>
        ) : (
          <Input
            type="text"
            name="Edit todo"
            value={inputValueEdit}
            onChange={(e) => setInputValueEdit(e.currentTarget.value)}
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(id, inputValueEdit);
            }}
            className="rounded-lg border-2 border-white/50 bg-white/20 p-2 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-0"
          />
        )}

        <div className="flex items-center gap-2 rounded-lg bg-white/30 p-3 text-xl *:transition *:duration-300 hover:*:cursor-pointer hover:*:text-black/60">
          {!editing && (
            <Pen
              onClick={() => handleEdit(id, inputValueEdit)}
              aria-label="Edit todo"
            />
          )}
          <Check
            onClick={() => {
              editing ? handleEdit(id, inputValueEdit) : handleDelete(id);
            }}
            aria-label={!editing ? "Delete todo" : "Save changes"}
          />
        </div>
      </div>
    </div>
  );
}

export default Todo;

import React, { useState } from "react";
import { Input } from "./ui/input";
import { FaPen } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import useTodo from "@/hooks/useTodo";

function Todo({ id, content, editing }: Todo) {
  const { handleEdit, handleDelete, inputValueEdit, setInputValueEdit } =
    useTodo();

  console.log("Content: ", content, "Editing: ", editing, "ID: ", id);

  return (
    <div className="w-96 cursor-pointer select-none" tabIndex={0}>
      <div className="flex items-center justify-between gap-3 rounded-md bg-white/20 p-2 text-white transition duration-300 hover:bg-white/30">
        {!editing ? (
          <p className="overflow-hidden break-words">{content}</p>
        ) : (
          <Input
            type="text"
            value={inputValueEdit}
            onChange={(e) => setInputValueEdit(e.currentTarget.value)}
            onSubmit={(e) => {
              e.preventDefault();
              handleEdit(id);
            }}
            className="w-full rounded-lg border-2 border-white/50 bg-white/20 p-2 text-white placeholder:text-white/50 focus:border-white/50 focus:ring-0"
          />
        )}

        <div className="flex cursor-pointer items-center gap-2 rounded-lg bg-white/60 p-3 text-xl">
          <FaPen
            onClick={() => handleEdit(id)}
            className="transition duration-300 hover:text-black/80"
          />
          <ImCheckmark
            onClick={() => {
              editing ? handleEdit(id) : handleDelete(id);
            }}
            className="transition duration-300 hover:text-black/80"
          />
        </div>
      </div>
    </div>
  );
}

export default Todo;

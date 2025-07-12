import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectPriorityProps } from "./types/select-priority";
import { Priority } from "./types/todo";

export const priorities = {
  low: { color: "bg-green-700", text: "Low" },
  medium: { color: "bg-yellow-500", text: "Medium" },
  high: { color: "bg-red-700", text: "High" },
};

export function SelectPriority({ priority, setPriority }: SelectPriorityProps) {
  return (
    <Select
      onValueChange={(value) => {
        setPriority(value as Priority);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={
            <div className="flex items-center">
              <div
                className={`size-2 rounded-full ${priorities[priority].color} mr-2`}
              />
              <p>{priorities[priority].text}</p>
            </div>
          }
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Priority</SelectLabel>
          <div className="flex flex-col gap-1">
            {Object.entries(priorities).map(([value, { color, text }]) => (
              <SelectItem key={value} value={value}>
                <div
                  className={`size-2 rounded-full ${color} mr-2 inline-block`}
                ></div>
                {text}
              </SelectItem>
            ))}
          </div>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

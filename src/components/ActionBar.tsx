import React, { useContext } from "react";
import { Button } from "./ui/button";
import { ArrowUpWideNarrow, ChevronUp, Trash } from "lucide-react";
import { TodoContext } from "@/contexts/TodoContext/TodoContext";
import { useScroll } from "@/hooks/useScroll";
import type {
  ActionBarButton,
  ActionBarProps,
} from "@/components/types/action-bar";

export const ActionBar = ({ loaded }: ActionBarProps) => {
  const { todos, handleClear, handleSortTodos } = useContext(TodoContext)!;
  const { scrollY } = useScroll();

  const actionBarButtons: ActionBarButton[] = [
    {
      name: "Clear",
      icon: <Trash />,
      title: "Clear all todos",
      action: handleClear,
      show: loaded && todos.length > 0,
    },
    {
      name: "Scroll Up",
      icon: <ChevronUp />,
      title: "Scroll to top",
      action: () => {
        scrollTo({ top: 0, behavior: "smooth" });
      },
      show: scrollY > 50,
    },
    {
      name: "Sort",
      icon: <ArrowUpWideNarrow />,
      title: "Sort by priority",
      action: handleSortTodos,
      show: true, // Always show sort button
    },
  ];

  return (
    <div className="fixed right-5 bottom-5 z-50 rounded-md bg-white/10 p-2 backdrop-blur-lg">
      {actionBarButtons.map((button) => {
        if (!button.show) return null;
        return (
          <Button
            key={button.name}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            title={button.title}
            onClick={button.action}
          >
            {button.icon}
          </Button>
        );
      })}
    </div>
  );
};

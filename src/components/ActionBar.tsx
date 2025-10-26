import React, { useContext } from "react";
import { Button } from "./ui/button";
import { ArrowUpWideNarrow, ChevronUp, Moon, Sun, Trash } from "lucide-react";
import { TodoContext } from "@/contexts/TodoContext/TodoContext";
import { useScroll } from "@/hooks/useScroll";
import type {
  ActionBarButton,
  ActionBarProps,
} from "@/components/types/action-bar";
import { useTheme } from "next-themes";

export const ActionBar = ({ loaded }: ActionBarProps) => {
  const { todos, handleClear, handleSortTodos } = useContext(TodoContext)!;
  const { scrollY } = useScroll();
  const { setTheme, theme } = useTheme();

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
      show: todos.length > 0 && scrollY > 100,
    },
    {
      name: "Sort",
      icon: <ArrowUpWideNarrow />,
      title: "Sort by priority",
      action: handleSortTodos,
      show: true, // Always show sort button
    },
    {
      name: "Toggle Theme",
      icon: theme === "light" ? <Moon /> : <Sun />,
      title: "Toggle theme",
      action: () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      },
      show: true,
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
            size="lg"
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

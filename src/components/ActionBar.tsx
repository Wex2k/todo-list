import type {
  ActionBarButton,
  ActionBarProps,
} from "@/components/types/action-bar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useTodo } from "@/contexts/TodoContext/TodoContext";
import { useScroll } from "@/hooks/useScroll";
import { ArrowUpWideNarrow, ChevronUp, Moon, Sun, Trash } from "lucide-react";
import { useTheme } from "next-themes";

export const ActionBar = ({ loaded }: ActionBarProps) => {
  const { todos, handleClear, handleSortTodos } = useTodo();
  const { scrollY } = useScroll();
  const { setTheme, theme } = useTheme();

  const actionBarButtons: ActionBarButton[] = [
    {
      name: "Clear",
      icon: <Trash />,
      title: "Clear all todos",
      action: handleClear,
      show: todos.length > 0,
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
      show: todos.length > 1, // Show only if more than one todo exists
    },
    {
      name: "Toggle Theme",
      icon: theme === "light" ? <Moon /> : <Sun />,
      title: "Toggle theme",
      action: () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      },
      show: loaded,
    },
  ];

  return (
    <div className="fixed right-5 bottom-5 z-50 rounded-md border p-2 shadow-lg backdrop-blur-lg">
      {actionBarButtons.map((button) => {
        if (!button.show) return null;
        return (
          <Tooltip key={button.name}>
            <TooltipTrigger asChild>
              <Button
                key={button.name}
                name={button.title}
                variant="ghost"
                size="lg"
                onClick={button.action}
              >
                {button.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{button.title}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};

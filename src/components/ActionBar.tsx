import React, { useContext } from "react";
import { Button } from "./ui/button";
import { ArrowUpWideNarrow, ChevronUp, Trash } from "lucide-react";
import { TodoContext } from "@/contexts/TodoContext/TodoContext";
import { useScroll } from "@/hooks/useScroll";
import { ITodoContext } from "@/contexts/TodoContext/todo-context";
import { ActionBarProps } from "@/components/types/action-bar";

export const ActionBar = ({ loaded }: ActionBarProps) => {
  const { todos, handleClear, handleSortTodos } = useContext(
    TodoContext,
  ) as ITodoContext;
  const { scrollY } = useScroll();

  const showClearButton = loaded && todos.length > 0;
  const showScrollUpButton = scrollY > 50;
  const displayActionBar = showClearButton || showScrollUpButton;

  return (
    <>
      {displayActionBar && (
        <div className="fixed bottom-5 right-5 z-50 rounded-md bg-white/10 p-2 backdrop-blur-lg">
          <div className="flex gap-2 *:animate-fade-in-scale">
            {showClearButton && (
              <Button variant="ghost" size="icon" title="Clear all todos">
                <Trash onClick={() => handleClear()} />
              </Button>
            )}
            {showScrollUpButton && (
              <Button variant="ghost" size="icon" title="Scroll to top">
                <ChevronUp
                  onClick={() => {
                    scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </Button>
            )}
            <Button variant="ghost" size="icon" title="Sort by priority">
              <ArrowUpWideNarrow onClick={() => handleSortTodos()} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

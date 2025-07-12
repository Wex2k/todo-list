import React, { useContext } from "react";
import { Button } from "./ui/button";
import { ArrowUpWideNarrow, ChevronUp, Trash } from "lucide-react";
import { TodoContext } from "@/contexts/TodoContext/TodoContext";
import { useScroll } from "@/hooks/useScroll";
import { ActionBarProps } from "@/components/types/action-bar";

export const ActionBar = ({ loaded }: ActionBarProps) => {
  const { todos, handleClear, handleSortTodos } = useContext(TodoContext)!;
  const { scrollY } = useScroll();

  const showClearButton = loaded && todos.length > 0;
  const showScrollUpButton = scrollY > 50;
  const displayActionBar = showClearButton || showScrollUpButton;

  return (
    <>
      {displayActionBar && (
        <div className="fixed right-5 bottom-5 z-50 rounded-md bg-white/10 p-2 backdrop-blur-lg">
          <div className="*:animate-fade-in-scale flex gap-2">
            {showClearButton && (
              <Button
                variant="ghost"
                size="icon"
                title="Clear all todos"
                className="cursor-pointer"
              >
                <Trash onClick={handleClear} />
              </Button>
            )}
            {showScrollUpButton && (
              <Button
                variant="ghost"
                size="icon"
                title="Scroll to top"
                className="cursor-pointer"
              >
                <ChevronUp
                  onClick={() => {
                    scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              title="Sort by priority"
              className="cursor-pointer"
            >
              <ArrowUpWideNarrow onClick={handleSortTodos} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

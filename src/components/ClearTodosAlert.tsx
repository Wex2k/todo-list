import React from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const ClearTodosAlert = ({
  message,
  triggerMessage,
  handleClear,
  icon,
}: AlertProps) => {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"secondary"}
            className="size-12 gap-1 rounded-full p-2 uppercase"
          >
            {triggerMessage}
            {icon}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-black">
          <AlertDialogHeader className="text-white">
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>{message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleClear}
              className="hover:bg-red-600"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

import { Priority } from "./todo";

export type SelectPriorityProps = {
  priority: Priority;
  setPriority: (value: Priority) => void;
};

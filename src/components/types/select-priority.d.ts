import { Priority } from "./todo";

export interface SelectPriorityProps {
  priority: Priority;
  setPriority: (value: Priority) => void;
}

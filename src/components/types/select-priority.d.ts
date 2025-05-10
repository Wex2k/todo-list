import { Priority } from "./todo";

/**
 * This interface defines the structure of the SelectPriority component's props.
 * It includes a priority value and a function to set the priority.
 *
 * @property {Priority} priority - The current priority level of the todo item.
 * @property {(value: Priority) => void} setPriority - A function to update the priority level.
 */
export interface SelectPriorityProps {
  priority: Priority;
  setPriority: (value: Priority) => void;
}

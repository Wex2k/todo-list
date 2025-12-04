/**
 * Represents the priority levels for a to-do item.
 *
 * - `LOW`: Indicates a low priority task.
 * - `MEDIUM`: Indicates a medium priority task.
 * - `HIGH`: Indicates a high priority task.
 */
export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

/**
 * Maps priority levels to their corresponding numeric order.
 *
 * The `priorityOrder` object assigns a numeric value to each priority level,
 * where a lower number indicates a lower priority and a higher number indicates a higher priority.
 *
 * - `low`: 1
 * - `medium`: 2
 * - `high`: 3
 *
 * This mapping can be used for sorting or comparing todo priorities.
 */
export const priorityOrder = {
  low: 1,
  medium: 2,
  high: 3,
};

import type { ElementColor } from "~/types";

export type TransactionColor = Extract<ElementColor, "EMERALD" | "ROSE">;
export type TransactionCategory =
  | "LEND_MORE"
  | "COLLECT"
  | "BORROW_MORE"
  | "PAY";

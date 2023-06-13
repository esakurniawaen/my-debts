import type { Debt, ElementColor } from "~/types";

export type DebtColor = Extract<ElementColor, "YELLOW" | "LIME">;

export type SortDebtsBy =
  | "NEWEST"
  | "OLDEST"
  | "ASCENDING"
  | "DESCENDING"
  | "HIGHEST_REMAINING_PAYMENT"
  | "LOWEST_REMAINING_PAYMENT";

export type DebtCategoriesToFilter = {
  type: Debt["type"];
  date: "ACTIVE" | "DUE";
  payment: "ACTIVE" | "PAID_OFF";
};

export type DebtFormState = {
  type: "ADD" | "EDIT";
  debt: Debt;
};

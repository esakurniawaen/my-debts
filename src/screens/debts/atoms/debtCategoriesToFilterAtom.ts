import { atom } from "jotai";
import type { Debt } from "~/atoms/debtsAtom";

export type DebtCategoriesToFilter = {
  type: Debt["type"];
  paidoff: boolean;
  overdue: boolean;
  sortBy:
    | "NEWEST"
    | "OLDEST"
    | "ASCENDING"
    | "DESCENDING"
    | "HIGHEST_REMAINING_TO_PAY"
    | "LOWEST_REMAINING_TO_PAY";
};

export const debtCategoriesToFilterAtom = atom<DebtCategoriesToFilter>({
  type: "LEND",
  paidoff: false,
  overdue: false,
  sortBy: "NEWEST",
});

import { atom } from "jotai";
import type { Debt } from "~/atoms/debtsAtom";

export type DebtFormState = {
  type: "ADD" | "EDIT";
  debt: Debt;
};

export const debtFormAtom = atom<DebtFormState | null>(null);

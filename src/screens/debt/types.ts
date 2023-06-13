import type { Debt, ElementColor, NoninitialDebtTransaction } from "~/types";

export type TransactionColor = Extract<ElementColor, "EMERALD" | "ROSE">;

export type TransactionFormState = {
  type: "ADD" | "EDIT";
  debt: Debt;
  transaction: NoninitialDebtTransaction;
};

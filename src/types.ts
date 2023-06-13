import type { CURRENCIES } from "~/store/defaultCurrencyStore";

export type ElementColor = "BLUE" | "YELLOW" | "EMERALD" | "LIME" | "ROSE";
export type ElementSize = "SMALL" | "MEDIUM" | "LARGE";

export type Currency = (typeof CURRENCIES)[number];

export type Debt = {
  createdAt: number;
  dueAt?: number;
  currency: Currency;
  personName: string;
  phoneNumber?: string;
  transactions: DebtTransaction[];
  description?: string;
  type: "LEND" | "BORROW";
  id: string;
};
interface CommonDebtTransactionProps {
  id: string;
  exclude: boolean;
  amount: number;
}
export interface InitialDebtTransaction extends CommonDebtTransactionProps {
  type: "INITIAL";
}
export interface NoninitialDebtTransaction extends CommonDebtTransactionProps {
  type: "INCREASE" | "DECREASE";
  createdAt: number;
  note?: string;
}
export type DebtTransaction =
  | InitialDebtTransaction
  | NoninitialDebtTransaction;

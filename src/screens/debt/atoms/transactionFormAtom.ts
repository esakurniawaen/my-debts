import { atom } from "jotai";
import type { NoninitialTransaction, Transaction } from "~/atoms/debtsAtom";

export type TransactionFormState = {
  type: "ADD" | "EDIT";
  title: string;
  debtId: string;
  transaction: NoninitialTransaction;
};

export const transactionFormAtom = atom<TransactionFormState | null>(null);

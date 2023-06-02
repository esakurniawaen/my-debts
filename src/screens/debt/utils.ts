import type { Debt, Transaction } from "~/atoms/debtsAtom";
import type { TransactionCategory } from "./types";

export const getTransactionCategory = (
  debtType: Debt["type"],
  transactionType: Transaction["type"]
): TransactionCategory => {
  if (debtType === "LEND") {
    if (transactionType === "INCREASE") return "LEND_MORE";
    return "COLLECT";
  } else {
    if (transactionType === "INCREASE") return "BORROW_MORE";
    return "PAY";
  }
};

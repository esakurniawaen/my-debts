

import { atom } from "jotai";
import type { Currency } from "./debtDefaultCurrencyAtom";
import { atomWithStorage } from "jotai/utils";

export type Debt = {
  createdAt: number;
  dueAt?: number;
  currency: Currency;
  personName: string;
  phoneNumber?: string;
  transactions: Transaction[];
  description?: string;
  type: "LEND" | "BORROW";
  id: string;
};

interface CommonTransactionProps {
  id: string;
  exclude: boolean;
  amount: number;
}

export interface InitialTransaction extends CommonTransactionProps {
  type: "INITIAL";
}

export interface NoninitialTransaction extends CommonTransactionProps {
  type: "INCREASE" | "DECREASE";
  createdAt: number;
  note?: string;
}

export type Transaction = InitialTransaction | NoninitialTransaction;

export const debtsAtom = atomWithStorage<Debt[]>("debts", []);

export const addDebtAtom = atom(null, (get, set, toAddDebt: Debt) => {
  const addedDebtIntoDebtsArray = [toAddDebt, ...get(debtsAtom)];

  set(debtsAtom, addedDebtIntoDebtsArray);
});

export const updateDebtAtom = atom(
  null,
  (get, set, debtId: string, fieldsToUpdate: Partial<Debt>) => {
    const updatedSelectedDebt = get(debtsAtom).map((debt) =>
      debt.id === debtId ? { ...debt, ...fieldsToUpdate } : debt
    );

    set(debtsAtom, updatedSelectedDebt);
  }
);

export const deleteDebtAtom = atom(null, (get, set, debtId: string) => {
  const deletedSelectedDebt = get(debtsAtom).filter(
    (debt) => debt.id !== debtId
  );

  set(debtsAtom, deletedSelectedDebt);
});

export const addTransactionAtom = atom(
  null,
  (get, set, debtId: string, toAddTransaction: Transaction) => {
    const addedTransactionToSelectedDebt = get(debtsAtom).map((debt) =>
      debt.id === debtId
        ? { ...debt, transactions: [toAddTransaction, ...debt.transactions] }
        : debt
    );

    set(debtsAtom, addedTransactionToSelectedDebt);
  }
);

export const updateTransactionAtom = atom(
  null,
  (
    get,
    set,
    debtId: string,
    transactionId: string,
    fieldsToUpdate: Partial<Omit<Transaction, 'id' | 'type'>>
  ) => {
    const updatedTransactionInSelectedDebt = get(debtsAtom).map((debt) =>
      debt.id === debtId
        ? {
            ...debt,
            transactions:  debt.transactions.map((transaction) =>
              transaction.id === transactionId
                ? { ...transaction, ...fieldsToUpdate }
                : transaction
            ),
          }
        : debt
    );

    set(debtsAtom, updatedTransactionInSelectedDebt);
  }
);

export const updateAllTransactionsAtom = atom(
  null,
  (get, set, debtId: string, updatedTransactions: Transaction[]) => {
    const updatedTransactionsInSelectedDebt = get(debtsAtom).map((debt) =>
      debt.id === debtId
        ? {
            ...debt,
            transactions: updatedTransactions,
          }
        : debt
    );

    set(debtsAtom, updatedTransactionsInSelectedDebt);
  }
);

export const deleteTransactionAtom = atom(
  null,
  (get, set, debtId: string, transactionId: string) => {
    const deletedTransactionInSelectedDebt = get(debtsAtom).map((debt) =>
      debt.id === debtId
        ? {
            ...debt,
            transactions: debt.transactions.filter(
              (transaction) => transaction.id !== transactionId
            ),
          }
        : debt
    );

    set(debtsAtom, deletedTransactionInSelectedDebt);
  }
);

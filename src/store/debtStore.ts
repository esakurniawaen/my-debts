import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Debt, NoninitialDebtTransaction } from "~/types";

interface DebtState {
  debts: Debt[];
  addDebt: (toAddDebt: Debt) => void;
  updateDebt: (debtId: string, fieldsToUpdate: Partial<Debt>) => void;
  deleteDebt: (debtId: string) => void;
  addDebtTransaction: (
    debtId: string,
    toAddTransaction: NoninitialDebtTransaction
  ) => void;
  updateDebtTransaction: (
    debtId: string,
    transactionId: string,
    fieldsToUpdate: Partial<Omit<NoninitialDebtTransaction, "exclude">>
  ) => void;
  toggleDebtTransactionExclude: (debtId: string, transactionId: string) => void;
  unexcludeAllDebtTransactions: (debtId: string) => void;
  deleteDebtTransaction: (debtId: string, transactionId: string) => void;
}

export const useDebtStore = create<DebtState>()(
  persist(
    (set) => ({
      debts: [],
      addDebt: (debt) => set((state) => ({ debts: [debt, ...state.debts] })),
      updateDebt: (debtId: string, fieldsToUpdate) =>
        set((state) => ({
          debts: state.debts.map((debt) =>
            debt.id === debtId ? { ...debt, ...fieldsToUpdate } : debt
          ),
        })),
      deleteDebt: (debtId: string) =>
        set((state) => ({
          debts: state.debts.filter((debt) => debt.id !== debtId),
        })),
      addDebtTransaction: (debtId, transaction) =>
        set((state) => ({
          debts: state.debts.map((debt) =>
            debt.id === debtId
              ? { ...debt, transactions: [transaction, ...debt.transactions] }
              : debt
          ),
        })),
      updateDebtTransaction: (debtId, transactionId, fieldsToUpdate) =>
        set((state) => ({
          debts: state.debts.map((debt) =>
            debt.id === debtId
              ? {
                  ...debt,
                  transactions: debt.transactions.map((transaction) =>
                    transaction.id === transactionId &&
                    transaction.type !== "INITIAL"
                      ? { ...transaction, ...fieldsToUpdate }
                      : transaction
                  ),
                }
              : debt
          ),
        })),

      toggleDebtTransactionExclude: (debtId, transactionId) =>
        set((state) => ({
          debts: state.debts.map((debt) =>
            debt.id === debtId
              ? {
                  ...debt,
                  transactions: debt.transactions.map((transaction) =>
                    transaction.id === transactionId
                      ? { ...transaction, exclude: !transaction.exclude }
                      : transaction
                  ),
                }
              : debt
          ),
        })),
      unexcludeAllDebtTransactions: (debtId) =>
        set((state) => ({
          debts: state.debts.map((debt) =>
            debt.id === debtId
              ? {
                  ...debt,
                  transactions: debt.transactions.map((transaction) =>
                    transaction.exclude
                      ? { ...transaction, exclude: false }
                      : transaction
                  ),
                }
              : debt
          ),
        })),
      deleteDebtTransaction: (debtId, transactionId) =>
        set((state) => ({
          debts: state.debts.map((debt) =>
            debt.id === debtId
              ? {
                  ...debt,
                  transactions: debt.transactions.filter(
                    (transaction) => transaction.id !== transactionId
                  ),
                }
              : debt
          ),
        })),
    }),
    {
      name: "debt-storage",
    }
  )
);

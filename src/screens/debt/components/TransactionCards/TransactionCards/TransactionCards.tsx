import { useSetAtom } from "jotai";
import { useState } from "react";
import {
  deleteTransactionAtom,
  updateTransactionAtom,
  type Debt,
  type NoninitialTransaction,
} from "~/atoms/debtsAtom";
import Grid from "~/components/Grid";
import useSearchTransactions from "../../../hooks/useSearchTransactions";
import TransactionCardsWindow from "../../TransactionCardsWindow/TransactionCardsWindow";
import { type TransactionFormState } from "../../TransactionModal/TransactionForm";
import TransactionCard from "./TransactionCard/TransactionCard";

interface TransactionCardsProps {
  debt: Debt;
  noteQuery: string;
  onFormStateChange: (formState: TransactionFormState) => void;
}

const TransactionCards = ({
  debt,
  noteQuery,
  onFormStateChange,
}: TransactionCardsProps) => {
  const deleteTransaction = useSetAtom(deleteTransactionAtom);
  const updateTransaction = useSetAtom(updateTransactionAtom);

  const [excludeMode, setExcludeMode] = useState(false);

  const handleDeleteTransaction = (transactionId: string) => {
    const proceed = confirm("Delete transaction forever?");
    if (!proceed) return;

    deleteTransaction(debt.id, transactionId);
  };

  const { searchedTransactions, hasSearchedTransactionsBeenFound } =
    useSearchTransactions(debt.transactions, noteQuery);

  return (
    <TransactionCardsWindow
      debtId={debt.id}
      transactions={debt.transactions}
      excludeMode={excludeMode}
      onExcludeModeChange={setExcludeMode}
    >
      {hasSearchedTransactionsBeenFound ? (
        <Grid>
          {searchedTransactions.map((transaction) => (
            <TransactionCard
              excludeMode={excludeMode}
              noteQuery={noteQuery}
              key={transaction.id}
              transaction={transaction}
              debtCurrency={debt.currency}
              onDelete={() => handleDeleteTransaction(transaction.id)}
              onEdit={() =>
                onFormStateChange({
                  type: "EDIT",
                  debt: debt,
                  transaction: transaction as NoninitialTransaction,
                })
              }
              onExcludeToggle={() =>
                updateTransaction(debt.id, transaction.id, {
                  exclude: !transaction.exclude,
                })
              }
            />
          ))}
        </Grid>
      ) : (
        <div className="rounded-lg border border-slate-700 px-4 py-3">
          <h3 className="text-center text-base font-semibold text-red-400">
            No Transactions was Found
          </h3>
        </div>
      )}
    </TransactionCardsWindow>
  );
};

export default TransactionCards;

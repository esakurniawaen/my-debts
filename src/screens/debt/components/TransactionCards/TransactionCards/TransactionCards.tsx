import { useState } from "react";
import Grid from "~/components/Grid";
import { useDebtStore } from "~/store/debtStore";
import type { Debt, NoninitialDebtTransaction } from "~/types";
import useSearchTransactions from "../../../hooks/useSearchTransactions";
import TransactionCardsWindow from "../../TransactionCardsWindow/TransactionCardsWindow";
import TransactionCard from "./TransactionCard/TransactionCard";
import type { TransactionFormState } from "../../../types";

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
  const { toggleDebtTransactionExclude, deleteDebtTransaction } = useDebtStore(
    (state) => state
  );

  const [excludeMode, setExcludeMode] = useState(false);

  const handleDeleteTransaction = (transactionId: string) => {
    const proceed = confirm("Delete transaction forever?");
    if (!proceed) return;

    deleteDebtTransaction(debt.id, transactionId);
  };

  const { searchedTransactions, hasSearchedTransactionsBeenFound } =
    useSearchTransactions(debt.transactions, noteQuery);

  return (
    <TransactionCardsWindow
      debtId={debt.id}
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
                  transaction: transaction as NoninitialDebtTransaction,
                })
              }
              onExcludeToggle={() =>
                toggleDebtTransactionExclude(debt.id, transaction.id)
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

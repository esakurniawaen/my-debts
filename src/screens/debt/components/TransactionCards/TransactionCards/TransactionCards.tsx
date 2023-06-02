import { Switch } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";
import {
  deleteTransactionAtom,
  updateAllTransactionsAtom,
  updateTransactionAtom,
  type Debt,
} from "~/atoms/debtsAtom";
import Grid from "~/components/Grid";
import { excludeModeAtom } from "~/screens/debt/atoms/excludeModeAtom";
import { transactionFormAtom } from "~/screens/debt/atoms/transactionFormAtom";
import useSearchTransactions from "../../../hooks/useSearchTransactions";
import { getTransactionCategory } from "../../../utils";
import TransactionCard from "./TransactionCard";

interface TransactionCardsProps {
  debt: Debt;
}

const TransactionCards = ({ debt }: TransactionCardsProps) => {
  const setTransactionForm = useSetAtom(transactionFormAtom);
  const deleteTransaction = useSetAtom(deleteTransactionAtom);
  const updateTransaction = useSetAtom(updateTransactionAtom);
  const updateAllTransactions = useSetAtom(updateAllTransactionsAtom);

  const excludeMode = useAtomValue(excludeModeAtom);

  const handleDeleteTransaction = (transactionId: string) => {
    const proceed = confirm("Delete transaction forever?");
    if (!proceed) return;

    deleteTransaction(debt.id, transactionId);
  };

  useEffect(() => {
    return () =>
      updateAllTransactions(
        debt.id,
        debt.transactions.map((transaction) =>
          transaction.exclude === true
            ? { ...transaction, exclude: false }
            : transaction
        )
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { searchedTransactions, hasSearchedTransactionsBeenFound } =
    useSearchTransactions(debt.transactions);

  return (
    <>
      {hasSearchedTransactionsBeenFound ? (
        <Grid>
          {searchedTransactions.map((transaction) => (
            <article
              key={transaction.id}
              className={clsx(
                excludeMode && "flex items-center gap-x-4 md:gap-x-3"
              )}
            >
              {excludeMode && (
                <Switch
                  checked={transaction.exclude}
                  onChange={() =>
                    updateTransaction(debt.id, transaction.id, {
                      exclude: !transaction.exclude,
                    })
                  }
                  className={clsx("h-5 w-5 rounded", {
                    "bg-blue grid place-items-center": transaction.exclude,
                    "border  border-slate-700 bg-slate-800":
                      !transaction.exclude,
                  })}
                >
                  <span className="sr-only">
                    Exclude this transaction from debt amounts (e.g total debt,
                    total paid and remaining payment)
                  </span>
                  {transaction.exclude && (
                    <CheckIcon className="h-4 w-4 text-white" />
                  )}
                </Switch>
              )}

              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                debtCurrency={debt.currency}
                onDelete={() => handleDeleteTransaction(transaction.id)}
                onEdit={() =>
                  setTransactionForm({
                    type: "EDIT",
                    title: getTransactionCategory(debt.type, transaction.type),
                    debtId: debt.id,
                    transaction: transaction,
                  })
                }
              />
            </article>
          ))}
        </Grid>
      ) : (
        <div className="rounded-lg border border-slate-700 px-4 py-3">
          <h3 className="text-center text-base font-semibold text-red-400">
            No Transactions was Found
          </h3>
        </div>
      )}
    </>
  );
};

export default TransactionCards;

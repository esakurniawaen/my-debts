import { useMemo } from "react";
import { type DebtTransaction } from "~/types";

type UseSearchTransactionsByNoteReturnedProps =
  | {
      searchedTransactions: never[];
      hasSearchedTransactionsBeenFound: false;
    }
  | {
      searchedTransactions: DebtTransaction[];
      hasSearchedTransactionsBeenFound: true;
    };

const useSearchTransactionsByNote = (
  transactions: DebtTransaction[],
  noteQuery: string
): UseSearchTransactionsByNoteReturnedProps => {
  const searchedTransactions = useMemo(
    () =>
      noteQuery !== ""
        ? transactions.filter((transaction) => {
            if (transaction.type !== "INITIAL") {
              if (transaction.note)
                return transaction.note
                  .toLocaleLowerCase()
                  .includes(noteQuery.toLocaleLowerCase());
            }
          })
        : transactions,
    [transactions, noteQuery]
  );

  return searchedTransactions.length === 0 && noteQuery !== ""
    ? {
        searchedTransactions: [],
        hasSearchedTransactionsBeenFound: false,
      }
    : {
        searchedTransactions,
        hasSearchedTransactionsBeenFound: true,
      };
};

export default useSearchTransactionsByNote;

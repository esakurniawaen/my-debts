import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { type Transaction } from "~/atoms/debtsAtom";
import { noteQueryAtom } from "../atoms/noteQueryAtom";

type UseSearchTransactionsReturnedProps =
  | {
      searchedTransactions: never[];
      hasSearchedTransactionsBeenFound: false;
    }
  | {
      searchedTransactions: Transaction[];
      hasSearchedTransactionsBeenFound: true;
    };

const useSearchTransactions = (
  transactions: Transaction[]
): UseSearchTransactionsReturnedProps => {
  const noteQuery = useAtomValue(noteQueryAtom);

  const searchedTransactions = useMemo(
    () =>
      transactions.filter((transaction) => {
        if (transaction.type === "INITIAL") return transaction;

        return transaction.note
          ? transaction.note
              .toLocaleLowerCase()
              .includes(noteQuery.toLocaleLowerCase())
          : transaction;
      }), [transactions, noteQuery]
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

export default useSearchTransactions;

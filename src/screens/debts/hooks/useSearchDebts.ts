import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { type Debt } from "~/atoms/debtsAtom";
import { nameQueryAtom } from "../atoms/nameQueryAtom";

type UseSearchDebtsReturnedProps =
  | {
      searchedDebts: never[];
      hasSearchedDebtsBeenFound: false;
    }
  | {
      searchedDebts: Debt[];
      hasSearchedDebtsBeenFound: true;
    };

const useSearchDebts = (debts: Debt[]): UseSearchDebtsReturnedProps => {
  const nameQuery = useAtomValue(nameQueryAtom);

  const searchedDebts = useMemo(
    () =>
      debts.filter((debt) =>
        debt.personName
          .toLocaleLowerCase()
          .includes(nameQuery.toLocaleLowerCase())
      ),
    [debts, nameQuery]
  );

  return searchedDebts.length === 0 && nameQuery !== ""
    ? { searchedDebts: [], hasSearchedDebtsBeenFound: false }
    : {
        searchedDebts,
        hasSearchedDebtsBeenFound: true,
      };
};

export default useSearchDebts;

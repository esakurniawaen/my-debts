import { useMemo } from "react";
import { type Debt } from "~/atoms/debtsAtom";

type UseSearchDebtsReturnedProps =
  | {
      searchedDebts: never[];
      hasSearchedDebtsBeenFound: false;
    }
  | {
      searchedDebts: Debt[];
      hasSearchedDebtsBeenFound: true;
    };

const useSearchDebts = (
  debts: Debt[],
  nameQuery: string
): UseSearchDebtsReturnedProps => {
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

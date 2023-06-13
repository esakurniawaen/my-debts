import { useMemo } from "react";
import type { Debt } from "~/types";

type UseSearchDebtsByNameReturnedProps =
  | {
      searchedDebts: never[];
      hasSearchedDebtsBeenFound: false;
    }
  | {
      searchedDebts: Debt[];
      hasSearchedDebtsBeenFound: true;
    };

const useSearchDebtsByName = (
  debts: Debt[],
  nameQuery: string
): UseSearchDebtsByNameReturnedProps => {
  const searchedDebts = useMemo(
    () =>
      nameQuery !== ""
        ? debts.filter((debt) =>
            debt.personName
              .toLocaleLowerCase()
              .includes(nameQuery.toLocaleLowerCase())
          )
        : debts,
    [debts, nameQuery]
  );

  return searchedDebts.length === 0 && nameQuery !== ""
    ? { searchedDebts: [], hasSearchedDebtsBeenFound: false }
    : {
        searchedDebts,
        hasSearchedDebtsBeenFound: true,
      };
};

export default useSearchDebtsByName;

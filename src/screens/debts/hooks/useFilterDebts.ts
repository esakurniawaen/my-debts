import { useMemo } from "react";
import type { Debt } from "~/types";
import type { DebtCategoriesToFilter } from "../types";

const useFilterDebts = (
  debts: Debt[] | undefined,
  categoriesToFilter: DebtCategoriesToFilter
) => {
  return useMemo(
    () =>
      debts
        ? debts.filter((debt) => debt.type === categoriesToFilter.type)
        : [],
    [debts, categoriesToFilter.type]
  );
};

export default useFilterDebts;

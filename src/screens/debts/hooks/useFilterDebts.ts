import { useMemo } from "react";
import { debtsAtom } from "~/atoms/debtsAtom";
import { type DebtCategoriesToFilter } from "../components/DebtCardsWindow/DebtCardsFilter";
import { useAtomValue } from "jotai";

const useFilterDebts = (categoriesToFilter: DebtCategoriesToFilter) => {
  const debts = useAtomValue(debtsAtom);

  return useMemo(
    () => debts.filter((debt) => debt.type === categoriesToFilter.type),
    [debts, categoriesToFilter.type]
  );
};
   
export default useFilterDebts;

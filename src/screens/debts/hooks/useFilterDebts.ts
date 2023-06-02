import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { debtsAtom } from "~/atoms/debtsAtom";
import { debtCategoriesToFilterAtom } from "../atoms/debtCategoriesToFilterAtom";

const useFilterDebts = () => {
  const debts = useAtomValue(debtsAtom);
  const debtCategoriesToFilter = useAtomValue(debtCategoriesToFilterAtom);

  return useMemo(
    () => debts.filter((debt) => debt.type === debtCategoriesToFilter.type),
    [debts, debtCategoriesToFilter.type]
  );
};

export default useFilterDebts;

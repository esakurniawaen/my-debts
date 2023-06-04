import { type Debt } from "~/atoms/debtsAtom";
import { useMemo } from "react";
import type { SortDebtsBy } from "../components/DebtCardsWindow/DebtCardsSorter";
import { DateTime } from "luxon";

// NOTE make this word as expected, just read the variable names and you'll undestand what do i expected.

const useSearchDebts = (debts: Debt[], sortType: SortDebtsBy) => {
  return useMemo(() => {
    if (sortType === "NEWEST") return debts;
    if (sortType === "OLDEST")
      return debts.sort((a, b) => {
        const createdDateA = DateTime.fromMillis(a.createdAt).toJSDate();
        const createdDateB = DateTime.fromMillis(b.createdAt).toJSDate();

        return createdDateA.valueOf() - createdDateB.valueOf();
      });
    if (sortType === "ASCENDING")
      return debts.sort((a, b) => {
        const personNameA = a.personName.toLowerCase();
        const personNameB = b.personName.toLowerCase();

        if (personNameA < personNameB) return 1;
        if (personNameA > personNameB) return -1;
        return 0;
      });
    if (sortType === "DESCENDING")
      return debts.sort((a, b) => {
        const personNameA = a.personName.toLowerCase();
        const personNameB = b.personName.toLowerCase();

        if (personNameA < personNameB) return -1;
        if (personNameA > personNameB) return 1;
        return 0;
      });
    if (sortType === "HIGHEST_REMAINING_PAYMENT")
      return debts.sort((a, b) => {
        const remainingPaymentA = a.transactions.reduce(
          (prevValue, { amount, type }) =>
            type === "DECREASE" ? prevValue - amount : prevValue + amount,
          0
        );
        const remainingPaymentB = b.transactions.reduce(
          (prevValue, { amount, type }) =>
            type === "DECREASE" ? prevValue - amount : prevValue + amount,
          0
        );

        return remainingPaymentB - remainingPaymentA;
      });
    if (sortType === "LOWEST_REMAINING_PAYMENT")
      return debts.sort((a, b) => {
        const remainingPaymentA = a.transactions.reduce(
          (prevValue, { amount, type }) =>
            type === "DECREASE" ? prevValue - amount : prevValue + amount,
          0
        );
        const remainingPaymentB = b.transactions.reduce(
          (prevValue, { amount, type }) =>
            type === "DECREASE" ? prevValue - amount : prevValue + amount,
          0
        );

        return remainingPaymentA - remainingPaymentB;
      });
  }, [debts, sortType]);
};

export default useSearchDebts;

import { useMemo } from "react";
import type { Transaction } from "~/atoms/debtsAtom";

const useDebtAmounts = (transactions: Transaction[]) => {
  const totalPaid = useMemo(
    () =>
      transactions.reduce((prevValue, { exclude, amount, type }) => {
        if (exclude) return prevValue;
        return type === "DECREASE" ? prevValue + amount : prevValue;
      }, 0),
    [transactions]
  );
  const totalDebt = useMemo(
    () =>
      transactions.reduce((prevValue, { exclude, amount, type }) => {
        if (exclude) return prevValue;
        return type === "INITIAL" || type === "INCREASE"
          ? prevValue + amount
          : prevValue;
      }, 0),
    [transactions]
  );
  const remainingToPay = useMemo(
    () =>
      transactions.reduce((prevValue, { amount, type, exclude }) => {
        if (exclude) return prevValue;

        return type === "DECREASE" ? prevValue - amount : prevValue + amount;
      }, 0),
    [transactions]
  );

  return { totalDebt, totalPaid, remainingToPay };
};

export default useDebtAmounts;

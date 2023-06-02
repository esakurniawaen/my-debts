import { createId } from "@paralleldrive/cuid2";
import { PrimaryButton, SecondaryButton } from "~/components/buttons";
import { DateTime } from "luxon";
import type { Debt } from "~/atoms/debtsAtom";
import { useSetAtom } from "jotai";
import { transactionFormAtom } from "../atoms/transactionFormAtom";

interface TransactionButtonsProps {
  debtType: Debt["type"];
  debtId: string;
}

const TransactionButtons = ({ debtType, debtId }: TransactionButtonsProps) => {
  const setTransactionForm = useSetAtom(transactionFormAtom);

  return (
    <>
      <SecondaryButton
        onClick={() =>
          setTransactionForm({
            type: "ADD",
            title: debtType === "LEND" ? "LEND_MORE" : "BORROW_MORE",
            debtId,
            transaction: {
              type: "INCREASE",
              createdAt: DateTime.now().toMillis(),
              amount: 0,
              exclude: false,
              id: createId(),
            },
          })
        }
        color="ROSE"
      >
        {debtType === "LEND" ? "Lend more" : "Borrow more"}
      </SecondaryButton>
      <PrimaryButton
        onClick={() =>
          setTransactionForm({
            type: "ADD",
            title: debtType === "LEND" ? "COLLECT" : "PAY",
            debtId,
            transaction: {
              type: "DECREASE",
              createdAt: DateTime.now().toMillis(),
              amount: 0,
              exclude: false,
              id: createId(),
            },
          })
        }
        color="EMERALD"
      >
        {debtType === "LEND" ? "Collect" : "Pay"}
      </PrimaryButton>
    </>
  );
};

export default TransactionButtons;

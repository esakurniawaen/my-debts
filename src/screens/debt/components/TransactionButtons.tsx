import { createId } from "@paralleldrive/cuid2";
import { DateTime } from "luxon";
import type { Debt } from "~/types";
import { PrimaryButton, SecondaryButton } from "~/components/buttons";
import type { TransactionFormState } from "../types";

interface TransactionButtonsProps {
  debt: Debt;
  onFormStateChange: (formState: TransactionFormState) => void;
}

const TransactionButtons = ({
  debt,
  onFormStateChange,
}: TransactionButtonsProps) => {
  return (
    <>
      <SecondaryButton
        onClick={() =>
          onFormStateChange({
            type: "ADD",
            debt,
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
        {debt.type === "LEND" ? "Lend more" : "Borrow more"}
      </SecondaryButton>
      <PrimaryButton
        onClick={() =>
          onFormStateChange({
            type: "ADD",
            debt,
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
        {debt.type === "LEND" ? "Collect" : "Pay"}
      </PrimaryButton>
    </>
  );
};

export default TransactionButtons;

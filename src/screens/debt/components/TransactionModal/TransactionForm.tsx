import { type FormEvent, forwardRef } from "react";
import { useMap } from "react-use";
import Label from "~/components/Label";
import { PrimaryButton } from "~/components/buttons";
import { Input, MoneyInput } from "~/components/inputs";
import { fromDatetimeLocal, toDatetimeLocal } from "~/utils";
import type { TransactionColor } from "../../types";
import type { Debt, NoninitialTransaction } from "~/atoms/debtsAtom";

export type TransactionFormState = {
  type: "ADD" | "EDIT";
  debt: Debt;
  transaction: NoninitialTransaction;
};

interface TransactionFormProps {
  onSubmit: (transaction: NoninitialTransaction) => void;
  formState: TransactionFormState;
  formColor: TransactionColor;
}

const TransactionForm = forwardRef<HTMLInputElement, TransactionFormProps>(
  ({ formColor, formState, onSubmit }, amountInputRef) => {
    const [transactionPreview, { set: setTransactionPreviewField }] = useMap(
      formState.transaction
    );

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(transactionPreview);
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="grid gap-3 rounded-lg bg-slate-900/30 p-4 md:p-6"
      >
        <div>
          <Label htmlFor="created-transaction-at" text="Date" />
          <Input
            id="created-transaction-at"
            value={toDatetimeLocal(transactionPreview.createdAt)}
            onChange={(e) =>
              setTransactionPreviewField(
                "createdAt",
                fromDatetimeLocal(e.target.value)
              )
            }
            type="datetime-local"
            required={true}
            borderColorWhenFocused={formColor}
          />
        </div>

        <div>
          <Label htmlFor="transaction-amount" text="Amount" />
          <MoneyInput
            prefix={`${formState.debt.currency} `}
            borderColorWhenFocused={formColor}
            onFocus={(e) => e.target.select()}
            value={transactionPreview.amount || undefined}
            onChange={(value) =>
              setTransactionPreviewField("amount", value ?? 0)
            }
            placeholder="0.00"
            ref={amountInputRef}
            id="transaction-amount"
            required={true}
          />
        </div>

        <div className="mb-2">
          <Label htmlFor="transaction-note" text="Note - Optional" />
          <Input
            id="transaction-note"
            value={transactionPreview.note}
            onChange={(e) => setTransactionPreviewField("note", e.target.value)}
            type="text"
            borderColorWhenFocused={formColor}
          />
        </div>

        <PrimaryButton
          disabled={transactionPreview.amount === 0}
          type="submit"
          width="FULL"
          color={formColor}
        >
          {formState.type === "ADD" ? "Add" : "Edit"}
        </PrimaryButton>
      </form>
    );
  }
);

TransactionForm.displayName = "TransactionForm";

export default TransactionForm;

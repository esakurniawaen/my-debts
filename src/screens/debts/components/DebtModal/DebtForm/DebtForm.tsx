import { forwardRef, type FormEvent } from "react";
import { useMap } from "react-use";
import type { Debt } from "~/types";
import Label from "~/components/Label";
import { PrimaryButton } from "~/components/buttons";
import { Input } from "~/components/inputs";
import DateInputs from "./DateInputs";
import DebtDetailInputs from "./DebtDetailInputs";
import PersonDetailInputs from "./PersonDetailInputs";
import type { DebtFormState } from "~/screens/debts/types";

interface DebtFormProps {
  formState: DebtFormState;
  onSubmit: (debt: Debt) => void;
}

const DebtForm = forwardRef<HTMLInputElement, DebtFormProps>(
  ({ onSubmit, formState }, nameInputRef) => {
    const [debtPreview, { set: setDebtPreviewField }] = useMap(formState.debt);

    const handleDebtSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(debtPreview);
    };

    const areRequiredInputsEmpty =
      !debtPreview.transactions[0]?.amount || debtPreview.personName === "";

    const formColor = debtPreview.type === "LEND" ? "YELLOW" : "LIME";

    return (
      <form
        onSubmit={handleDebtSubmit}
        className="grid gap-y-3 rounded-lg p-4 md:p-6"
      >
        <DateInputs
          colorWhenFocused={formColor}
          debtPreview={debtPreview}
          onDebtPreviewFieldChange={setDebtPreviewField}
        />

        <PersonDetailInputs
          colorWhenFocused={formColor}
          debtPreview={debtPreview}
          onDebtPreviewFieldChange={setDebtPreviewField}
          ref={nameInputRef}
        />

        <DebtDetailInputs
          colorWhenFocused={formColor}
          debtPreview={debtPreview}
          onDebtPreviewFieldChange={setDebtPreviewField}
        />

        <div className="mb-2">
          <Label htmlFor="debt-description" text="Description - Optional" />
          <Input
            borderColorWhenFocused={formColor}
            value={debtPreview.description}
            onChange={(e) => setDebtPreviewField("description", e.target.value)}
          />
        </div>

        <PrimaryButton
          color={formColor}
          type="submit"
          disabled={areRequiredInputsEmpty}
          width="FULL"
        >
          {formState.type === "EDIT" ? "Edit" : "Create"}
        </PrimaryButton>
      </form>
    );
  }
);

DebtForm.displayName = "DebtForm";

export default DebtForm;

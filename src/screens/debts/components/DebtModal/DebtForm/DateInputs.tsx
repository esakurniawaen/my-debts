import Label from "~/components/Label";
import { Input } from "~/components/inputs";
import { DebtColor } from "../../../types";
import { Debt } from "~/atoms/debtsAtom";
import { fromDatetimeLocal, toDatetimeLocal } from "~/utils";

interface DateInputsProps {
  debtPreview: Debt;
  onDebtPreviewFieldChange: <K extends keyof Debt>(
    key: K,
    value: Debt[K]
  ) => void;
  colorWhenFocused: DebtColor;
}

const DateInputs = ({
  onDebtPreviewFieldChange,
  debtPreview,

  colorWhenFocused,
}: DateInputsProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 ">
      <div>
        <Label htmlFor="created-date" text="Created At" />
        <Input
          borderColorWhenFocused={colorWhenFocused}
          required={true}
          id="created-date"
          type="datetime-local"
          value={toDatetimeLocal(debtPreview.createdAt)}
          onChange={(e) =>
            onDebtPreviewFieldChange(
              "createdAt",
              fromDatetimeLocal(e.target.value)
            )
          }
        />
      </div>

      <div>
        <Label htmlFor="due-date" text="Due At - Optional" />
        <Input
          borderColorWhenFocused={colorWhenFocused}
          type="datetime-local"
          value={debtPreview.dueAt && toDatetimeLocal(debtPreview.dueAt)}
          id="due-date"
          onChange={(e) =>
            onDebtPreviewFieldChange("dueAt", fromDatetimeLocal(e.target.value))
          }
        />
      </div>
    </div>
  );
};

export default DateInputs;

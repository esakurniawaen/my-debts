import { forwardRef } from "react";
import { Input } from "~/components/inputs";
import type { Debt } from "~/types";
import { capitalizeWords } from "~/utils";
import Label from "~/components/Label";
import type { DebtColor } from "../../../types";

interface PersonDetailInputsProps {
  colorWhenFocused: DebtColor;
  debtPreview: Debt;
  onDebtPreviewFieldChange: <K extends keyof Debt>(
    key: K,
    value: Debt[K]
  ) => void;
}

const PersonDetailInputs = forwardRef<
  HTMLInputElement,
  PersonDetailInputsProps
>(({ colorWhenFocused, debtPreview, onDebtPreviewFieldChange }, ref) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 ">
      <div>
        <Label htmlFor="name" text="Name" />
        <Input
          borderColorWhenFocused={colorWhenFocused}
          value={debtPreview.personName}
          onChange={(e) =>
            onDebtPreviewFieldChange(
              "personName",
              capitalizeWords(e.target.value)
            )
          }
          required={true}
          id="name"
          ref={ref}
        />
      </div>

      <div>
        <Label htmlFor="phone-number" text="Phone Number - Optional" />
        <Input
          borderColorWhenFocused={colorWhenFocused}
          id="phone-number"
          value={debtPreview.phoneNumber}
          onChange={(e) =>
            onDebtPreviewFieldChange("phoneNumber", e.target.value)
          }
          type="tel"
        />
      </div>
    </div>
  );
});

PersonDetailInputs.displayName = "PersonDetailInputs";

export default PersonDetailInputs;

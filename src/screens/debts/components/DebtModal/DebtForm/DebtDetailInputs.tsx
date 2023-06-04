import { CURRENCIES } from "~/atoms/debtDefaultCurrency";
import { type Debt } from "~/atoms/debtsAtom";
import Label from "~/components/Label";
import { MoneyInput, RadioOptions } from "~/components/inputs";
import Combobox from "~/components/selects/Combobox";
import { type DebtColor } from "../../../types";

interface DebtDetailInputsProps {
  colorWhenFocused: DebtColor;
  debtPreview: Debt;
  onDebtPreviewFieldChange: <K extends keyof Debt>(
    key: K,
    value: Debt[K]
  ) => void;
}

const DebtDetailInputs = ({
  colorWhenFocused,
  debtPreview,
  onDebtPreviewFieldChange,
}: DebtDetailInputsProps) => {
  const handleUpdateInitialDebtAmount = (initialDebtAmount: number) => {
    const updatedInitialTransactionAmount = debtPreview.transactions.map(
      (transaction, idx) =>
        idx === 0 ? { ...transaction, amount: initialDebtAmount } : transaction
    );

    onDebtPreviewFieldChange("transactions", updatedInitialTransactionAmount);
  };

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 ">
      <div>
        <Label htmlFor="debt-amount" text="Initial Debt Amount" />

        <div className="flex">
          <div className="w-28">
            <Combobox
              colorWhenFocused={colorWhenFocused}
              options={CURRENCIES}
              selectedOption={debtPreview.currency}
              onSelectedOptionChange={(currency) =>
                onDebtPreviewFieldChange("currency", currency)
              }
            />
          </div>
          <MoneyInput
            borderColorWhenFocused={colorWhenFocused}
            placeholder="0.00"
            onFocus={(e) => e.target.select()}
            id="debt-amount"
            value={debtPreview.transactions[0]?.amount || undefined}
            onChange={(amount) => handleUpdateInitialDebtAmount(amount ?? 0)}
            required={true}
          />
        </div>
      </div>

      <RadioOptions
        label="Type"
        selectedOption={debtPreview.type}
        options={["LEND", "BORROW"]}
        onSelectedOptionChange={(debtType) =>
          onDebtPreviewFieldChange("type", debtType)
        }
        direction="ROW"
        radioColorWhenSelected={colorWhenFocused}
      />
    </div>
  );
};

export default DebtDetailInputs;

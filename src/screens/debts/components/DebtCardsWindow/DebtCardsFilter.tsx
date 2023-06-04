import { Popover } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { type Debt } from "~/atoms/debtsAtom";
import { SecondaryButton } from "~/components/buttons";
import { RadioOptions } from "~/components/inputs";
import { type DebtColor } from "../../types";

export type DebtCategoriesToFilter = {
  type: Debt["type"];
  date: "ACTIVE" | "DUE";
  payment: "ACTIVE" | "PAID_OFF";
};

interface DebtCardsFilterProps {
  radioColorWhenSelected: DebtColor;
  dateToFilter: DebtCategoriesToFilter["date"];
  paymentToFilter: DebtCategoriesToFilter["payment"];
  onDateToFilterChange: (dateToFilter: DebtCategoriesToFilter["date"]) => void;
  onPaymentToFilterChange: (
    paymentToFilter: DebtCategoriesToFilter["payment"]
  ) => void;
}

const DebtCardsFilter = ({
  radioColorWhenSelected,
  dateToFilter,
  paymentToFilter,
  onDateToFilterChange,
  onPaymentToFilterChange,
}: DebtCardsFilterProps) => {
  return (
    <Popover className="relative">
      <Popover.Button as={SecondaryButton} size="SMALL">
        <FunnelIcon className="h-6 w-6" />
        Filter
      </Popover.Button>

      <Popover.Panel className="absolute right-0 z-40 mt-4 max-h-80 overflow-y-auto rounded-lg bg-slate-800 p-4 shadow-md backdrop-blur-md">
        <div className="flex flex-col gap-6 md:flex-row">
          <RadioOptions
            options={["ACTIVE", "PAID_OFF"]}
            label="Payment"
            onSelectedOptionChange={(payment) =>
              onPaymentToFilterChange(payment)
            }
            selectedOption={paymentToFilter}
            radioColorWhenSelected={radioColorWhenSelected}
          />
          <RadioOptions
            options={["ACTIVE", "DUE"]}
            label="Date"
            onSelectedOptionChange={(date) => onDateToFilterChange(date)}
            selectedOption={dateToFilter}
            radioColorWhenSelected={radioColorWhenSelected}
          />
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default DebtCardsFilter;

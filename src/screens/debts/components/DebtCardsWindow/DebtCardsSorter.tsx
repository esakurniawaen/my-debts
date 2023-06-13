import { Popover } from "@headlessui/react";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { SecondaryButton } from "~/components/buttons";
import { RadioOptions } from "~/components/inputs";
import type {
  DebtCategoriesToFilter,
  DebtColor,
  SortDebtsBy,
} from "../../types";

type DebtCardsSorterProps = {
  radioColorWhenSelected: DebtColor;
  paymentToFilter: DebtCategoriesToFilter["payment"];
  sortBy: SortDebtsBy;
  onSortByChange: (sortBy: SortDebtsBy) => void;
};

export default function DebtCardsSorter({
  radioColorWhenSelected,
  sortBy,
  paymentToFilter,
  onSortByChange,
}: DebtCardsSorterProps) {
  return (
    <Popover className="relative">
      <Popover.Button as={SecondaryButton} size="SMALL">
        <ArrowsUpDownIcon className="h-6 w-6" />
        Sort
      </Popover.Button>

      <Popover.Panel className="absolute right-0 z-40 mt-4 max-h-80 overflow-y-auto rounded-lg bg-slate-800 p-4 shadow-md backdrop-blur-md">
        <RadioOptions
          label="Sort by"
          options={
            paymentToFilter === "ACTIVE"
              ? [
                  "NEWEST",
                  "OLDEST",
                  "ASCENDING",
                  "DESCENDING",
                  "HIGHEST_REMAINING_PAYMENT",
                  "LOWEST_REMAINING_PAYMENT",
                ]
              : ["NEWEST", "OLDEST", "ASCENDING", "DESCENDING"]
          }
          onSelectedOptionChange={(nextSort) => onSortByChange(nextSort)}
          selectedOption={sortBy}
          radioColorWhenSelected={radioColorWhenSelected}
        />
      </Popover.Panel>
    </Popover>
  );
}

import { Popover } from "@headlessui/react";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { SecondaryButton } from "~/components/buttons";
import { RadioOptions } from "~/components/inputs";
import {
  debtCategoriesToFilterAtom,
  type DebtCategoriesToFilter,
} from "../../atoms/debtCategoriesToFilterAtom";

const DebtCardsFilter = () => {
  const [debtCategoriesToFilter, setDebtCategoriesToFilter] = useAtom(
    debtCategoriesToFilterAtom
  );
  const radioColorWhenSelected =
    debtCategoriesToFilter.type === "LEND" ? "YELLOW" : "LIME";

  return (
    <Popover className="relative">
      <Popover.Button as={SecondaryButton} size="SMALL">
        <FunnelIcon className="h-6 w-6" />
        Filter
      </Popover.Button>

      <Popover.Panel className="absolute right-0 z-40 mt-4 max-h-80 overflow-y-auto rounded-lg bg-slate-800 p-4 shadow-md backdrop-blur-md">
        <div className="flex flex-col gap-6 md:flex-row">
          <RadioOptions
            options={["Yes", "No"]}
            label="Paid off"
            onSelectedOptionChange={(paidoffStatus) =>
              setDebtCategoriesToFilter({
                ...debtCategoriesToFilter,
                paidoff: paidoffStatus === "Yes" ? true : false,
              })
            }
            selectedOption={debtCategoriesToFilter.paidoff ? "Yes" : "No"}
            radioColorWhenSelected={radioColorWhenSelected}
          />
          <RadioOptions
            options={["Yes", "No"]}
            label="Overdue"
            onSelectedOptionChange={(dueStatus) =>
              setDebtCategoriesToFilter({
                ...debtCategoriesToFilter,
                overdue: dueStatus === "Yes" ? true : false,
              })
            }
            selectedOption={debtCategoriesToFilter.overdue ? "Yes" : "No"}
            radioColorWhenSelected={radioColorWhenSelected}
          />
          <RadioOptions
            options={
              [
                "NEWEST",
                "OLDEST",
                "ASCENDING",
                "DESCENDING",
                "HIGHEST_REMAINING_TO_PAY",
                "LOWEST_REMAINING_TO_PAY",
              ] as DebtCategoriesToFilter["sortBy"][]
            }
            label="Sort by"
            onSelectedOptionChange={(sortBy) =>
              setDebtCategoriesToFilter({
                ...debtCategoriesToFilter,
                sortBy,
              })
            }
            selectedOption={debtCategoriesToFilter.sortBy}
            radioColorWhenSelected={radioColorWhenSelected}
          />
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default DebtCardsFilter;

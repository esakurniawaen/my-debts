import type { ReactNode } from "react";
import FilterByDebtTypeButtons from "./FilterByDebtTypeButtons";
import DebtCardsFilter, {
  type DebtCategoriesToFilter,
} from "./DebtCardsFilter";
import { type DebtFormState } from "../DebtModal/DebtForm/DebtForm";
import { PlusIcon } from "@heroicons/react/24/outline";
import { PrimaryButton } from "~/components/buttons";
import { createId } from "@paralleldrive/cuid2";
import { DateTime } from "luxon";
import { useAtomValue } from "jotai";
import { debtDefaultCurrencyAtom } from "~/atoms/debtDefaultCurrency";
import DebtCardsSorter, { type SortDebtsBy } from "./DebtCardsSorter";

interface DebtCardsWindowProps {
  children: ReactNode;
  categoriesToFilter: DebtCategoriesToFilter;
  onCategoriesToFilterChange: (
    categoriesToFilter: DebtCategoriesToFilter
  ) => void;
  onFormStateChange: (formState: DebtFormState) => void;
  sortBy: SortDebtsBy;
  onSortByChange: (sortBy: SortDebtsBy) => void;
}

const DebtCardsWindow = ({
  children,
  categoriesToFilter,
  onCategoriesToFilterChange,
  onFormStateChange,
  sortBy,
  onSortByChange,
}: DebtCardsWindowProps) => {
  const color = categoriesToFilter.type === "LEND" ? "YELLOW" : "LIME";

  const defaultCurrency = useAtomValue(debtDefaultCurrencyAtom);

  return (
    <>
      <section className="sticky top-0 z-30 mb-4 shadow-lg">
        <h2 className="sr-only">Navigation & Controls</h2>
        <FilterByDebtTypeButtons
          typeToFilter={categoriesToFilter.type}
          onTypeToFilterChange={(typeToFilter) =>
            onCategoriesToFilterChange({
              ...categoriesToFilter,
              type: typeToFilter,
            })
          }
        />
        <footer className="flex justify-end gap-x-3 py-4 transition">
          <h4 className="sr-only">Debt controls</h4>
          {/* <DebtCardsSorter
            radioColorWhenSelected={color}
            paymentToFilter={categoriesToFilter.payment}
            sortBy={sortBy}
            onSortByChange={(nextSort) => onSortByChange(nextSort)}
          />
          <DebtCardsFilter
            radioColorWhenSelected={color}
            dateToFilter={categoriesToFilter.date}
            onDateToFilterChange={(dateToFilter) =>
              onCategoriesToFilterChange({
                ...categoriesToFilter,
                date: dateToFilter,
              })
            }
            paymentToFilter={categoriesToFilter.payment}
            onPaymentToFilterChange={(paymentToFilter) =>
              onCategoriesToFilterChange({
                ...categoriesToFilter,
                payment: paymentToFilter,
              })
            }
          /> */}
          <PrimaryButton
            onClick={() =>
              onFormStateChange({
                type: "ADD",
                debt: {
                  type: categoriesToFilter.type,
                  transactions: [
                    {
                      type: "INITIAL",
                      amount: 0,
                      id: createId(),
                      exclude: false,
                    },
                  ],
                  createdAt: DateTime.now().toMillis(),
                  currency: defaultCurrency,
                  personName: "",
                  id: createId(),
                },
              })
            }
            color={color}
            size="SMALL"
            data-tooltip-id="tooltip"
            data-tooltip-content="Create a new debt"
          >
            <PlusIcon className="h-6 w-6" />
            Create
          </PrimaryButton>
        </footer>
      </section>

      <section>
        <h2 className="sr-only">List of debts</h2>
        <div>{children}</div>
      </section>
    </>
  );
};

export default DebtCardsWindow;

import clsx from "clsx";
import type { Debt } from "~/types";

interface FilterByDebtTypeButtonsProps {
  typeToFilter: Debt["type"];
  onTypeToFilterChange: (typeToFilter: Debt["type"]) => void;
}

const FilterByDebtTypeButtons = ({
  typeToFilter,
  onTypeToFilterChange,
}: FilterByDebtTypeButtonsProps) => {
  return (
    <section>
      <h3 className="sr-only">Filter by debt type</h3>
      <div className="flex">
        <button
          onClick={() => onTypeToFilterChange("LEND")}
          className={clsx(
            "flex grow justify-center border-b border-solid py-3 font-sans font-semibold",
            {
              "border-yellow-400": typeToFilter === "LEND",
              "border-slate-800": typeToFilter === "BORROW",
            }
          )}
        >
          Lends
        </button>
        <button
          onClick={() => onTypeToFilterChange("BORROW")}
          className={clsx(
            "flex grow justify-center border-b border-solid py-3 font-sans font-semibold",
            {
              "border-lime-400": typeToFilter === "BORROW",
              "border-slate-800": typeToFilter === "LEND",
            }
          )}
        >
          Borrows
        </button>
      </div>
    </section>
  );
};

export default FilterByDebtTypeButtons;

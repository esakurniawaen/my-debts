import clsx from "clsx";
import { useAtom } from "jotai";
import { debtCategoriesToFilterAtom } from "~/screens/debts/atoms/debtCategoriesToFilterAtom";

const FilterByDebtTypeButtons = () => {
  const [debtCategoriesToFilter, setDebtCategoriesToFilter] = useAtom(
    debtCategoriesToFilterAtom
  );

  return (
    <section>
      <h3 className="sr-only">Filter by debt type</h3>
      <div className="flex">
        <button
          onClick={() =>
            setDebtCategoriesToFilter({
              ...debtCategoriesToFilter,
              type: "LEND",
            })
          }
          className={clsx(
            "flex grow justify-center border-b border-solid py-3 font-sans font-semibold",
            {
              "border-yellow-400": debtCategoriesToFilter.type === "LEND",
              "border-slate-800": debtCategoriesToFilter.type === "BORROW",
            }
          )}
        >
          Lends
        </button>
        <button
          onClick={() =>
            setDebtCategoriesToFilter({
              ...debtCategoriesToFilter,
              type: "BORROW",
            })
          }
          className={clsx(
            "flex grow justify-center border-b border-solid py-3 font-sans font-semibold",
            {
              "border-lime-400": debtCategoriesToFilter.type === "BORROW",
              "border-slate-800": debtCategoriesToFilter.type === "LEND",
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

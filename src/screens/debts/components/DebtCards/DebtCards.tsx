import Grid from "~/components/Grid";
import useSearchDebts from "~/screens/debts/hooks/useSearchDebts";
import { useDebtStore } from "~/store/debtStore";
import useFilterDebts from "../../hooks/useFilterDebts";
import type { DebtCategoriesToFilter, DebtFormState } from "../../types";
import DebtCard from "./DebtCard";

interface DebtCardsProps {
  nameQuery: string;
  categoriesToFilter: DebtCategoriesToFilter;
  onFormStateChange: (formState: DebtFormState) => void;
}

const DebtCards = ({
  nameQuery,
  onFormStateChange,
  categoriesToFilter,
}: DebtCardsProps) => {
  const { debts, deleteDebt } = useDebtStore((state) => state);

  const handleDeleteDebt = (debtId: string) => {
    const isProceed = confirm("Do you want to delete this debt permanently?");
    if (!isProceed) return;

    deleteDebt(debtId);
  };

  const filteredDebts = useFilterDebts(debts, categoriesToFilter);
  const { searchedDebts, hasSearchedDebtsBeenFound } = useSearchDebts(
    filteredDebts,
    nameQuery
  );

  return (
    <>
      {hasSearchedDebtsBeenFound ? (
        <Grid>
          {searchedDebts.map((debt) => (
            <DebtCard
              nameQuery={nameQuery}
              debt={debt}
              onDelete={() => handleDeleteDebt(debt.id)}
              onEdit={() => onFormStateChange({ type: "EDIT", debt: debt })}
              key={debt.id}
            />
          ))}
        </Grid>
      ) : (
        <div className="rounded-lg border border-slate-900 px-4 py-3">
          <h3 className="text-center text-base font-semibold text-red-400">
            {categoriesToFilter.type === "LEND"
              ? "No Lends was Found"
              : "No Borrows was Found"}
          </h3>
        </div>
      )}
    </>
  );
};

export default DebtCards;

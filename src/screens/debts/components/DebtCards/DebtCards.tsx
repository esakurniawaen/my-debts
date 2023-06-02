import { useAtomValue, useSetAtom } from "jotai";
import { deleteDebtAtom } from "~/atoms/debtsAtom";
import Grid from "~/components/Grid";
import { debtCategoriesToFilterAtom } from "~/screens/debts/atoms/debtCategoriesToFilterAtom";
import { debtFormAtom } from "~/screens/debts/atoms/debtFormAtom";
import useSearchDebts from "~/screens/debts/hooks/useSearchDebts";
import useFilterDebts from "../../hooks/useFilterDebts";
import DebtCard from "./DebtCard";

const DebtCards = () => {
  const deleteDebt = useSetAtom(deleteDebtAtom);
  const { type } = useAtomValue(debtCategoriesToFilterAtom);
  const setDebtForm = useSetAtom(debtFormAtom);

  const handleDeleteDebt = (debtId: string) => {
    const isProceed = confirm("Do you want to delete this debt permanently?");
    if (!isProceed) return;

    deleteDebt(debtId);
  };

  const filteredDebts = useFilterDebts();
  const { searchedDebts, hasSearchedDebtsBeenFound } =
    useSearchDebts(filteredDebts);

  return (
    <>
      {hasSearchedDebtsBeenFound ? (
        <Grid>
          {searchedDebts.map((debt) => (
            <DebtCard
              debt={debt}
              onDelete={() => handleDeleteDebt(debt.id)}
              onEdit={() =>
                setDebtForm({
                  type: "EDIT",
                  debt,
                })
              }
              key={debt.id}
            />
          ))}
        </Grid>
      ) : (
        <div className="rounded-lg border border-slate-900 px-4 py-3">
          <h3 className="text-center text-base font-semibold text-red-400">
            {type === "LEND" ? "No Lends was Found" : "No Borrows was Found"}
          </h3>
        </div>
      )}
    </>
  );
};

export default DebtCards;

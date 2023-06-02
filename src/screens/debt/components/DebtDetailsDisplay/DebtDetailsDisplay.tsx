import type { Debt } from "~/atoms/debtsAtom";
import DebtAmounts from "./DebtAmounts";
import DebtDetails from "./DebtDetails";

type DebtDetailsDisplayProps = {
  debt: Debt;
};

const DebtDetailsDisplay = ({ debt }: DebtDetailsDisplayProps) => {
  return (
    <section className="rounded-lg bg-slate-900/40 shadow-lg">
      <h2 className="sr-only">Debt Details</h2>
      <DebtDetails
        currency={debt.currency}
        phoneNumber={debt.phoneNumber}
        description={debt.description}
        createdAt={debt.createdAt}
        dueAt={debt.dueAt}
        personName={debt.personName}
      />

      <DebtAmounts
        currency={debt.currency}
        type={debt.type}
        transactions={debt.transactions}
      />
    </section>
  );
};

export default DebtDetailsDisplay;

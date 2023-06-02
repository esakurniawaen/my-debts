import type { ReactNode } from "react";
import Grid from "~/components/Grid";
import CreateDebtButton from "./CreateDebtButton";
import DebtCardsFilter from "./DebtCardsFilter";
import FilterByDebtTypeButtons from "./FilterByDebtTypeButtons";

interface DebtCardsWindowProps {
  children: ReactNode;
}

const DebtCardsWindow = ({ children }: DebtCardsWindowProps) => {
  return (
    <main className="container mb-4">
      <section className="sticky top-0 z-30 mb-4 shadow-lg">
        <h2 className="sr-only">Navigation & Controls</h2>
        <FilterByDebtTypeButtons />
        <footer className="flex justify-end gap-x-3 py-4 transition">
          <h4 className="sr-only">Debt controls</h4>
          {/* <DebtCardsFilter /> */}
          <CreateDebtButton />
        </footer>
      </section>

      <section>
        <h2 className="sr-only">List of debts</h2>
        <div>{children}</div>
      </section>
    </main>
  );
};

export default DebtCardsWindow;

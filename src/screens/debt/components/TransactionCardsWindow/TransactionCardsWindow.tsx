import type { ReactElement } from "react";
import type { Transaction } from "~/atoms/debtsAtom";
import TransactionCardsControls from "./TransactionCardsControls";

interface TransactionCardsWindowProps {
  children: ReactElement;
  debtId: string;
  transactions: Transaction[];
  excludeMode: boolean;
  onExcludeModeChange: (excludeMode: boolean) => void;
}

const TransactionCardsWindow = ({
  children,
  debtId,
  transactions,
  excludeMode,
  onExcludeModeChange,
}: TransactionCardsWindowProps) => {
  return (
    <section className="mt-4">
      <h2 className="sr-only">List of transaction</h2>
      <section className="mb-4">
        <h3 className="sr-only">Controls of transaction list</h3>
        <TransactionCardsControls
          excludeMode={excludeMode}
          onExcludeModeChange={onExcludeModeChange}
          transactions={transactions}
          debtId={debtId}
        />
      </section>
      <section className="mb-20 lg:mb-4">
        <h3 className="sr-only">Transactions</h3>
        <div>{children}</div>
      </section>
    </section>
  );
};

export default TransactionCardsWindow;

import type { ReactElement } from "react";
import ExcludeModeButton from "./ExcludeModeButton";

interface TransactionCardsWindowProps {
  children: ReactElement;
  debtId: string;
  excludeMode: boolean;
  onExcludeModeChange: (excludeMode: boolean) => void;
}

const TransactionCardsWindow = ({
  children,
  debtId,
  excludeMode,
  onExcludeModeChange,
}: TransactionCardsWindowProps) => {
  return (
    <section className="mt-4">
      <h2 className="sr-only">List of transaction</h2>
      <section className="mb-4">
        <h3 className="sr-only">DebtTransaction list controls</h3>
        <div className="flex justify-end">
          <ExcludeModeButton
            excludeMode={excludeMode}
            onExcludeModeChange={onExcludeModeChange}
            debtId={debtId}
          />
        </div>
      </section>
      <section className="mb-20 lg:mb-4">
        <h3 className="sr-only">Transactions</h3>
        <div>{children}</div>
      </section>
    </section>
  );
};

export default TransactionCardsWindow;

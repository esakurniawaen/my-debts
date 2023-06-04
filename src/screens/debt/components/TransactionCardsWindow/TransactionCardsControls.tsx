import { useSetAtom } from "jotai";
import { updateAllTransactionsAtom, type Transaction } from "~/atoms/debtsAtom";
import { SecondaryButton } from "~/components/buttons";
import { useEffect } from "react";

type TransactionCardsControlsProps = {
  transactions: Transaction[];
  debtId: string;
  excludeMode: boolean;
  onExcludeModeChange: (excludeMode: boolean) => void;
};

export default function TransactionCardsControls({
  transactions,
  debtId,
  excludeMode,
  onExcludeModeChange,
}: TransactionCardsControlsProps) {
  const updateAllTransactions = useSetAtom(updateAllTransactionsAtom);

  const handleUnexcludeAllTransactions = () => {
    updateAllTransactions(
      debtId,
      transactions.map((transaction) =>
        transaction.exclude ? { ...transaction, exclude: false } : transaction
      )
    );

    onExcludeModeChange(false);
  };

  useEffect(() => {
    return () =>
      updateAllTransactions(
        debtId,
        transactions.map((transaction) =>
          transaction.exclude ? { ...transaction, exclude: false } : transaction
        )
      );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-end">
      {excludeMode ? (
        <SecondaryButton
          onClick={handleUnexcludeAllTransactions}
          size="SMALL"
          data-tooltip-id="tooltip"
          data-tooltip-content="And unexclude all transaction(s)"
          data-tooltip-place="bottom"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 fill-slate-400"
            viewBox="0 96 960 960"
          >
            <path d="M120 726v-60h300v60H120Zm0-165v-60h470v60H120Zm0-165v-60h470v60H120Zm530 500V726H480v-60h170V496h60v170h170v60H710v170h-60Z" />
          </svg>
          Close exclude mode
        </SecondaryButton>
      ) : (
        <SecondaryButton
          onClick={() => onExcludeModeChange(true)}
          size="SMALL"
          data-tooltip-id="tooltip"
          data-tooltip-content="And select some transaction(s) to exclude"
          data-tooltip-place="bottom"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7 fill-slate-400"
            viewBox="0 96 960 960"
          >
            <path d="m571 976-43-43 114-113-114-113 43-43 113 114 113-114 43 43-114 113 114 113-43 43-113-114-113 114ZM120 726v-60h300v60H120Zm0-165v-60h470v60H120Zm0-165v-60h470v60H120Z" />
          </svg>
          Open exclude mode
        </SecondaryButton>
      )}
    </div>
  );
}

import { useAtom, useSetAtom } from "jotai";
import { type Transaction, debtsAtom } from "~/atoms/debtsAtom";
import { Tooltip } from "react-tooltip";
import { SecondaryButton } from "~/components/buttons";
import { excludeModeAtom } from "../../atoms/excludeModeAtom";

type TransactionCardsControlsProps = {
  transactions: Transaction[];
  debtId: string;
};

export default function TransactionCardsControls({
  transactions,
  debtId,
}: TransactionCardsControlsProps) {
  const [excludeMode, setExcludeMode] = useAtom(excludeModeAtom);
  const setDebts = useSetAtom(debtsAtom);

  const handleUnexcludeAllTransactions = () => {
    const unexcludedAllTransactions = transactions.map((transaction) =>
      transaction.exclude ? { ...transaction, exclude: false } : transaction
    );
    setDebts((debts) =>
      debts.map((debt) =>
        debt.id === debtId
          ? { ...debt, transactions: unexcludedAllTransactions }
          : debt
      )
    );

    setExcludeMode(false);
  };

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
          onClick={() => setExcludeMode(true)}
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

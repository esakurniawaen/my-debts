import { useEffect } from "react";
import { SecondaryButton } from "~/components/buttons";
import { useDebtStore } from "~/store/debtStore";

type ExcludeModeButtonProps = {
  debtId: string;
  excludeMode: boolean;
  onExcludeModeChange: (excludeMode: boolean) => void;
};

export default function ExcludeModeButton({
  debtId,
  excludeMode,
  onExcludeModeChange,
}: ExcludeModeButtonProps) {
  const unexcludeAllDebtTransactions = useDebtStore(
    (state) => state.unexcludeAllDebtTransactions
  );

  const handleCloseExcludeModeClick = () => {
    unexcludeAllDebtTransactions(debtId);
    onExcludeModeChange(false);
  };

  useEffect(() => {
    return () => unexcludeAllDebtTransactions(debtId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-end">
      {excludeMode ? (
        <SecondaryButton
          onClick={handleCloseExcludeModeClick}
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
          data-tooltip-content="Then select some transaction(s) to exclude"
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

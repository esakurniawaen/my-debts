import type { Debt, Transaction } from "~/atoms/debtsAtom";
import CurrencyText from "../CurrencyText";
import type { Currency } from "~/atoms/debtDefaultCurrencyAtom";
import useDebtAmounts from "../../hooks/useDebtAmounts";

type DebtAmountsProps = {
  type: Debt["type"];
  currency: Currency;
  transactions: Transaction[];
};

const DebtAmounts = ({ type, currency, transactions }: DebtAmountsProps) => {
  const { totalDebt, totalPaid, remainingToPay } = useDebtAmounts(transactions);

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-3 rounded-lg bg-slate-900/80 p-3 lg:p-4">
      <div className="flex h-12 flex-col place-items-center items-center justify-center rounded bg-slate-800/60 text-xs ">
        <CurrencyText
          className="text-rose-400"
          prefix={currency + " "}
          value={totalDebt}
        />
        <p>{type === "LEND" ? "Total Lended" : "Total Borrowed"}</p>
      </div>

      <div className="flex h-12  flex-col items-center justify-center rounded bg-slate-800/60 text-xs">
        <CurrencyText
          className="text-emerald-400"
          prefix={currency + " "}
          value={totalPaid}
        />
        <p>{type === "LEND" ? "Total Collected" : "Total Paid"}</p>
      </div>

      <div className="col-span-2 flex h-20 flex-col items-center justify-center rounded-md bg-slate-800/60 lg:h-16">
        {remainingToPay > 0 && (
          <>
            <CurrencyText
              className="font-sans text-slate-300"
              prefix={currency + " "}
              value={remainingToPay}
            />
            <span>
              {type === "LEND" ? "Remaining to Collect" : "Remaining to Pay"}
            </span>
          </>
        )}
        {remainingToPay < 0 && (
          <>
            <CurrencyText
              className="font-sans text-slate-300"
              prefix={currency + " "}
              value={remainingToPay}
            />
            {type === "LEND" ? "Overcollected" : "Overpaid"}
          </>
        )}

        {remainingToPay === 0 && (
          <div className="rounded border border-blue-400 px-3 py-2 text-blue-400 ring ring-blue-500 ring-offset-1">
            PAID OFF
          </div>
        )}
      </div>
    </div>
  );
};

export default DebtAmounts;
import clsx from "clsx";
import { DateTime } from "luxon";
import { type Currency } from "~/atoms/debtDefaultCurrencyAtom";
import type { Transaction } from "~/atoms/debtsAtom";
import CardMenu from "~/components/selects/CardMenu";
import { toDatetimeLocal, toLocaleString } from "~/utils";
import CurrencyText from "../../CurrencyText";
import TransactionNote from "./TransactionNote";
import ReadMoreReadLess from "~/components/ReadMoreReadLess";
import { useAtomValue } from "jotai";
import { noteQueryAtom } from "~/screens/debt/atoms/noteQueryAtom";

interface TransactionCardProps {
  transaction: Transaction;
  debtCurrency: Currency;
  onEdit: () => void;
  onDelete: () => void;
}

const TransactionCard = ({
  transaction,
  debtCurrency,
  onEdit,
  onDelete,
}: TransactionCardProps) => {
  const noteQuery = useAtomValue(noteQueryAtom);

  const cardColor = transaction.type === "DECREASE" ? "EMERALD" : "ROSE";

  return (
    <div
      className={clsx(
        "flex grow items-center justify-between rounded-lg bg-slate-900/50 px-4 py-3 pr-0",
        {
          "border border-rose-400/30": transaction.type === "INITIAL",
          "shadow-lg": transaction.type !== "INITIAL",
        }
      )}
    >
      <div className="w-10/12">
        <h3
          className={clsx({
            "text-rose-400": cardColor === "ROSE",
            "text-emerald-400": cardColor === "EMERALD",
          })}
        >
          {transaction.type}
          {": "}
          <span className="rounded bg-slate-800/80 px-1.5 shadow">
            <CurrencyText
              prefix={debtCurrency + " "}
              value={transaction.amount}
            />
          </span>
        </h3>

        {transaction.type !== "INITIAL" && (
          <ul
            className={clsx("mt-1 list-inside list-[circle] text-xs", {
              "marker:text-emerald-400": transaction.type === "DECREASE",
              "marker:text-rose-400": transaction.type === "INCREASE",
            })}
          >
            <li>
              Created at:{" "}
              <time dateTime={toDatetimeLocal(transaction.createdAt)}>
                {toLocaleString(transaction.createdAt, DateTime.DATETIME_MED)}
              </time>
            </li>

            {transaction.note && (
              <li>
                Note: {""}
                <ReadMoreReadLess alwaysFullTextWhen={noteQuery !== ""}>
                  {transaction.note}
                </ReadMoreReadLess>
              </li>
            )}
          </ul>
        )}
      </div>
      {transaction.type !== "INITIAL" && (
        <CardMenu onDelete={onDelete} onEdit={onEdit} />
      )}
    </div>
  );
};

export default TransactionCard;

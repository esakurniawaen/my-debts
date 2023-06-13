import clsx from "clsx";
import { DateTime } from "luxon";
import Highlighter from "react-highlight-words";
import ReadMoreReadLess from "~/components/ReadMoreReadLess";
import type { NoninitialDebtTransaction } from "~/types";
import { toDatetimeLocal, toLocaleString } from "~/utils";

type TransactionDetailsProps = {
  transaction: NoninitialDebtTransaction;
  noteQuery: string;
};

export default function TransactionDetails({
  transaction,
  noteQuery,
}: TransactionDetailsProps) {
  return (
    <ul
      className={clsx("mt-1 list-inside list-[circle]", {
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
          {noteQuery === "" ? (
            <ReadMoreReadLess>{transaction.note}</ReadMoreReadLess>
          ) : (
            <Highlighter
              highlightClassName={clsx("bg-slate-800 rounded", {
                "text-emerald-400": transaction.type === "DECREASE",
                "text-rose-400": transaction.type === "INCREASE",
              })}
              className="inline"
              searchWords={[noteQuery]}
              textToHighlight={transaction.note}
            />
          )}
        </li>
      )}
    </ul>
  );
}

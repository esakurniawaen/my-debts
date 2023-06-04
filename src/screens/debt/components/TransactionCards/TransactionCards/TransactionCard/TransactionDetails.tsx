import clsx from "clsx";
import { DateTime } from "luxon";
import type { NoninitialTransaction } from "~/atoms/debtsAtom";
import ReadMoreReadLess from "~/components/ReadMoreReadLess";
import { toDatetimeLocal, toLocaleString } from "~/utils";

type TransactionDetailsProps = {
  transaction: NoninitialTransaction;
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
          <ReadMoreReadLess alwaysFullTextWhen={noteQuery !== ""}>
            {transaction.note}
          </ReadMoreReadLess>
        </li>
      )}
    </ul>
  );
}

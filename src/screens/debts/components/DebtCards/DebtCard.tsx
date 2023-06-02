import clsx from "clsx";
import { useAtomValue } from "jotai";
import { DateTime } from "luxon";
import Link from "next/link";
import Highlighter from "react-highlight-words";
import type { Debt } from "~/atoms/debtsAtom";
import CardMenu from "~/components/selects/CardMenu";
import { nameQueryAtom } from "~/screens/debts/atoms/nameQueryAtom";
import { toDatetimeLocal, toLocaleString } from "~/utils";

interface DebtCardProps {
  debt: Debt;
  onDelete: () => void;
  onEdit: () => void;
}

const DebtCard = ({ debt, onDelete, onEdit }: DebtCardProps) => {
  const nameQuery = useAtomValue(nameQueryAtom);

  const cardColor = debt.type === "LEND" ? "YELLOW" : "LIME";

  return (
    <article className="relative flex h-fit cursor-pointer items-center justify-between rounded-lg bg-slate-900/50 py-3 pl-4 pr-0 shadow-lg transition hover:bg-slate-900 hover:shadow-xl">
      <div className="w-5/6">
        <Link href={`/debts/${debt.id}`}>
          <h3>
            <Highlighter
              highlightClassName={clsx("bg-slate-800 rounded", {
                "text-yellow-400": cardColor === "YELLOW",
                "text-lime-400": cardColor === "LIME",
              })}
              searchWords={[nameQuery]}
              textToHighlight={debt.personName}
              className="notranslate block truncate text-lg font-semibold text-slate-300 hover:overflow-auto hover:text-clip"
            />
            <span aria-hidden="true" className="absolute inset-0 rounded-lg" />
          </h3>
        </Link>

        <ul
          className={clsx(
            "mt-1 grid list-inside list-[circle] gap-0.5 text-xs",
            {
              "marker:text-yellow-400": cardColor === "YELLOW",
              "marker:text-lime-400": cardColor === "LIME",
            }
          )}
        >
          <li>Currency: {debt.currency}</li>
          <li>
            Created at:{" "}
            <time dateTime={toDatetimeLocal(debt.createdAt)}>
              {toLocaleString(debt.createdAt, DateTime.DATETIME_MED)}
            </time>
          </li>
          {debt.dueAt && (
            <li>
              Due at:{" "}
              <time>{toLocaleString(debt.dueAt, DateTime.DATETIME_MED)}</time>
            </li>
          )}
        </ul>
      </div>

      <CardMenu onEdit={onEdit} onDelete={onDelete} />
    </article>
  );
};

export default DebtCard;

import clsx from "clsx";
import { type Currency } from "~/atoms/debtDefaultCurrency";
import { type Transaction } from "~/atoms/debtsAtom";
import CardMenu from "~/components/selects/CardMenu";
import CurrencyText from "../../../CurrencyText";
import ExcludeTransactionCheckbox from "./ExcludeTransactionCheckbox";
import TransactionDetails from "./TransactionDetails";
import { capitalizeFirstWord } from "~/utils";

interface TransactionCardProps {
  transaction: Transaction;
  debtCurrency: Currency;
  noteQuery: string;
  onEdit: () => void;
  excludeMode: boolean;
  onDelete: () => void;
  onExcludeToggle: () => void;
}

const TransactionCard = ({
  transaction,
  debtCurrency,
  onEdit,
  onDelete,
  onExcludeToggle,
  excludeMode,
  noteQuery,
}: TransactionCardProps) => {
  const cardColor = transaction.type === "DECREASE" ? "EMERALD" : "ROSE";

  return (
    <article
      key={transaction.id}
      className={clsx(excludeMode && "flex items-center gap-x-4 md:gap-x-3")}
    >
      {excludeMode && (
        <ExcludeTransactionCheckbox
          exclude={transaction.exclude}
          onExcludeToggle={onExcludeToggle}
          backgroundColorWhenChecked={cardColor}
        />
      )}

      <div
        className={clsx(
          "flex grow items-center justify-between rounded-lg bg-slate-900/50 px-4 py-3 pr-0",
          {
            "border border-rose-400/30": transaction.type === "INITIAL",
            "shadow-lg": transaction.type !== "INITIAL",
          }
        )}
      >
        <div className="">
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
            <TransactionDetails
              transaction={transaction}
              noteQuery={noteQuery}
            />
          )}
        </div>

        {transaction.type !== "INITIAL" && (
          <CardMenu onDelete={onDelete} onEdit={onEdit} />
        )}
      </div>
    </article>
  );
};

export default TransactionCard;

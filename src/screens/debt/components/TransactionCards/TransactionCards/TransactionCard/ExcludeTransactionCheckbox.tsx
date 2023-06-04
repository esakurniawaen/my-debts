import { Switch } from "@headlessui/react";
import { type TransactionColor } from "~/screens/debt/types";
import { CheckIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type ExcludeTransactionCheckboxProps = {
  exclude: boolean;
  onExcludeToggle: () => void;
  backgroundColorWhenChecked: TransactionColor;
};

export default function ExcludeTransactionCheckbox({
  exclude,
  onExcludeToggle,
  backgroundColorWhenChecked,
}: ExcludeTransactionCheckboxProps) {
  return (
    <Switch
      checked={exclude}
      onChange={onExcludeToggle}
      className={clsx("h-5 w-5 rounded", {
        "grid place-items-center": exclude,
        "bg-rose-600": exclude && backgroundColorWhenChecked === "ROSE",
        "bg-emerald-600": exclude && backgroundColorWhenChecked === "EMERALD",
        "border border-slate-700 bg-slate-800": !exclude,
      })}
    >
      <span className="sr-only">
        Exclude this transaction from debt amounts (e.g total debt or total pay
        and remaining payment)
      </span>
      {exclude && <CheckIcon className="h-4 w-4 text-white" />}
    </Switch>
  );
}

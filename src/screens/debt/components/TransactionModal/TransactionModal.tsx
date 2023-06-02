import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { useAtom, useSetAtom } from "jotai";
import { useRef } from "react";
import type { Transaction } from "~/atoms/debtsAtom";
import { addTransactionAtom, updateTransactionAtom } from "~/atoms/debtsAtom";
import { transactionFormAtom } from "../../atoms/transactionFormAtom";
import TransactionForm from "./TransactionForm";
import {
  capitalizeFirstWord,
  convertConstantCaseToLowercaseSeperatedWithSpaces,
} from "~/utils";

const TransactionModal = () => {
  const addTransaction = useSetAtom(addTransactionAtom);
  const updateTransaction = useSetAtom(updateTransactionAtom);
  const [transactionForm, setTransactionForm] = useAtom(transactionFormAtom);

  const amountInputRef = useRef<HTMLInputElement | null>(null);

  if (!transactionForm) return null;

  const handleTransactionSubmit = (transaction: Transaction) => {
    if (transactionForm.type === "ADD") {
      addTransaction(transactionForm.debtId, transaction);
    } else {
      updateTransaction(transactionForm.debtId, transaction.id, transaction);
    }

    setTransactionForm(null);
  };

  const modalColor =
    transactionForm.transaction.type === "DECREASE" ? "EMERALD" : "ROSE";

  return (
    <Dialog
      initialFocus={amountInputRef}
      open={Boolean(transactionForm)}
      className="relative z-40"
      onClose={() => setTransactionForm(null)}
    >
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-slate-950 shadow-lg">
          <Dialog.Title
            className={clsx("ml-4 py-4 text-lg font-bold md:ml-6", {
              "text-emerald-500": modalColor === "EMERALD",
              "text-rose-500": modalColor === "ROSE",
            })}
          >
            {capitalizeFirstWord(
              convertConstantCaseToLowercaseSeperatedWithSpaces(
                transactionForm.title
              )
            )}
          </Dialog.Title>
          <TransactionForm
            ref={amountInputRef}
            onSubmit={handleTransactionSubmit}
            formState={transactionForm}
            formColor={modalColor}
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TransactionModal;

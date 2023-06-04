import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { useSetAtom } from "jotai";
import { useRef } from "react";
import type { Transaction } from "~/atoms/debtsAtom";
import { addTransactionAtom, updateTransactionAtom } from "~/atoms/debtsAtom";
import TransactionForm, { type TransactionFormState } from "./TransactionForm";

interface TransactionModalProps {
  formState: TransactionFormState | null;
  onClose: () => void;
}

const TransactionModal = ({ formState, onClose }: TransactionModalProps) => {
  const addTransaction = useSetAtom(addTransactionAtom);
  const updateTransaction = useSetAtom(updateTransactionAtom);

  const amountInputRef = useRef<HTMLInputElement | null>(null);

  const handleTransactionSubmit = (transaction: Transaction) => {
    if (!formState) return;

    if (formState.type === "ADD") {
      addTransaction(formState.debt.id, transaction);
    } else {
      updateTransaction(formState.debt.id, transaction.id, transaction);
    }

    onClose();
  };

  const modalColor =
    formState?.transaction.type === "DECREASE" ? "EMERALD" : "ROSE";

  return (
    <Dialog
      initialFocus={amountInputRef}
      open={Boolean(formState)}
      className="relative z-40"
      onClose={onClose}
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
            {formState?.debt.type === "LEND"
              ? formState?.transaction.type === "INCREASE"
                ? "Lend More"
                : "Collect"
              : formState?.transaction.type === "INCREASE"
              ? "Borrow More"
              : "Pay"}
          </Dialog.Title>
          <TransactionForm
            ref={amountInputRef}
            onSubmit={handleTransactionSubmit}
            formState={formState as TransactionFormState}
            formColor={modalColor}
          />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default TransactionModal;

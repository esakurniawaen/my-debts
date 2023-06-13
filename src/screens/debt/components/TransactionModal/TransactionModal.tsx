import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { useRef } from "react";
import { useDebtStore } from "~/store/debtStore";
import type { NoninitialDebtTransaction } from "~/types";
import TransactionForm from "./TransactionForm";
import type { TransactionFormState } from "../../types";

interface TransactionModalProps {
  formState: TransactionFormState | null;
  onClose: () => void;
}

const TransactionModal = ({ formState, onClose }: TransactionModalProps) => {
  const { addDebtTransaction, updateDebtTransaction } = useDebtStore(
    (state) => state
  );

  const amountInputRef = useRef<HTMLInputElement | null>(null);

  const handleTransactionSubmit = (transaction: NoninitialDebtTransaction) => {
    if (!formState) return;

    if (formState.type === "ADD") {
      addDebtTransaction(formState.debt.id, transaction);
    } else {
      updateDebtTransaction(formState.debt.id, transaction.id, transaction);
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

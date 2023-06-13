import { Dialog } from "@headlessui/react";
import { useRef } from "react";
import { useDebtStore } from "~/store/debtStore";
import type { Debt } from "~/types";
import DebtForm from "./DebtForm";
import type { DebtFormState } from "../../types";

interface DebtModalProps {
  formState: DebtFormState | null;
  onClose: () => void;
}

const DebtModal = ({ formState, onClose }: DebtModalProps) => {
  const { addDebt, updateDebt } = useDebtStore((state) => state);

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const handleDebtSubmit = (debt: Debt) => {
    if (debt.transactions[0]?.amount === 0) return;

    if (formState?.type === "ADD") {
      addDebt(debt);
    } else {
      updateDebt(debt.id, debt);
    }

    onClose();
  };

  return (
    <Dialog
      initialFocus={nameInputRef}
      open={Boolean(formState)}
      className="relative z-40"
      onClose={onClose}
    >
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur"
        aria-hidden="true"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl rounded-lg bg-slate-950 shadow-md">
            <DebtForm
              formState={formState as DebtFormState}
              ref={nameInputRef}
              onSubmit={handleDebtSubmit}
            />
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default DebtModal;

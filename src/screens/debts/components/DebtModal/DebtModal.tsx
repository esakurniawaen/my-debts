import { Dialog } from "@headlessui/react";
import { useAtom, useSetAtom } from "jotai";
import { useRef } from "react";
import { addDebtAtom, updateDebtAtom, type Debt } from "~/atoms/debtsAtom";
import { debtFormAtom } from "../../atoms/debtFormAtom";
import DebtForm from "./DebtForm";

const DebtModal = () => {
  const [debtForm, setDebtForm] = useAtom(debtFormAtom);

  const addDebt = useSetAtom(addDebtAtom);
  const updateDebt = useSetAtom(updateDebtAtom);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  if (!debtForm) return null;

  const handleDebtSubmit = (debt: Debt) => {
    if (debt.transactions[0]?.amount === 0) return;

    if (debtForm.type === "ADD") {
      addDebt(debt);
    } else {
      updateDebt(debt.id, debt);
    }

    setDebtForm(null);
  };

  return (
    <Dialog
      initialFocus={nameInputRef}
      open={Boolean(debtForm)}
      className="relative z-40"
      onClose={() => setDebtForm(null)}
    >
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur"
        aria-hidden="true"
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-3xl rounded-lg bg-slate-950 shadow-md">
            <DebtForm
              formState={debtForm}
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

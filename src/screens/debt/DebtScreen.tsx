import { atom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { debtsAtom } from "~/atoms/debtsAtom";
import DebtDetails from "./components/DebtDetailsDisplay/DebtDetailsDisplay";
import DebtLayout from "./components/DebtLayout";
import TransactionButtons from "./components/TransactionButtons";
import TransactionCards from "./components/TransactionCards/TransactionCards/TransactionCards";
import TransactionModal from "./components/TransactionModal";
import { type TransactionFormState } from "./components/TransactionModal/TransactionForm";

const DebtScreen = () => {
  const router = useRouter();
  const currentDebt = useAtomValue(
    useMemo(
      () =>
        atom((get) =>
          get(debtsAtom).find((debt) => debt.id === router.query.id)
        ),
      [router.query.id]
    )
  );

  const [noteQuery, setNoteQuery] = useState("");
  const [formState, setFormState] = useState<TransactionFormState | null>(null);

  if (!currentDebt)
    return (
      <div className="grid place-items-center p-4">
        <h2 className="text-red text-lg font-semibold">404: Debt not found</h2>
      </div>
    );

  return (
    <DebtLayout
      debt={currentDebt}
      noteQuery={noteQuery}
      onNoteQueryChange={setNoteQuery}
      onFormStateChange={setFormState}
    >
      <main className="container">
        <DebtDetails debt={currentDebt} />

        <TransactionCards
          noteQuery={noteQuery}
          onFormStateChange={setFormState}
          debt={currentDebt}
        />
      </main>

      <TransactionModal
        formState={formState}
        onClose={() => setFormState(null)}
      />

      <footer className="fixed bottom-0 left-0 flex w-screen items-center justify-between bg-slate-800/30 px-4 py-3 shadow-sm backdrop-blur-md lg:hidden">
        <h2 className="sr-only">Transaction buttons</h2>
        <TransactionButtons
          debt={currentDebt}
          onFormStateChange={setFormState}
        />
      </footer>
    </DebtLayout>
  );
};

export default DebtScreen;

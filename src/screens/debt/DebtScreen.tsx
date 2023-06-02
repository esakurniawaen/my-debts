import { atom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { debtsAtom } from "~/atoms/debtsAtom";
import DebtDetails from "./components/DebtDetailsDisplay/DebtDetailsDisplay";
import DebtLayout from "./components/DebtLayout";
import TransactionButtons from "./components/TransactionButtons";
import TransactionCards from "./components/TransactionCards/TransactionCards/TransactionCards";
import TransactionCardsWindow from "./components/TransactionCardsWindow/TransactionCardsWindow";
import TransactionModal from "./components/TransactionModal";

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

  if (!currentDebt)
    return (
      <div className="grid place-items-center p-4">
        <h2 className="text-red text-lg font-semibold">Debt not found</h2>
      </div>
    );

  return (
    <DebtLayout debtId={currentDebt.id} debtType={currentDebt.type}>
      <main className="container">
        <DebtDetails debt={currentDebt} />

        <TransactionCardsWindow
          transactions={currentDebt.transactions}
          debtId={currentDebt.id}
        >
          <TransactionCards debt={currentDebt} />
        </TransactionCardsWindow>
      </main>

      <TransactionModal />

      <footer className="fixed bottom-0 left-0 flex w-screen items-center justify-between bg-slate-800/30 px-4 py-3 shadow-sm backdrop-blur-md lg:hidden">
        <h2 className="sr-only">Transaction buttons</h2>
        <TransactionButtons
          debtId={currentDebt.id}
          debtType={currentDebt.type}
        />
      </footer>
    </DebtLayout>
  );
};

export default DebtScreen;

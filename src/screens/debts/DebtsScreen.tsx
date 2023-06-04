import { useState } from "react";
import { useLocalStorage } from "react-use";
import DebtCards from "./components/DebtCards";
import type { DebtCategoriesToFilter } from "./components/DebtCardsWindow/DebtCardsFilter";
import type { SortDebtsBy } from "./components/DebtCardsWindow/DebtCardsSorter";
import DebtCardsWindow from "./components/DebtCardsWindow/DebtCardsWindow";
import DebtModal from "./components/DebtModal";
import type { DebtFormState } from "./components/DebtModal/DebtForm/DebtForm";
import DebtsLayout from "./components/DebtsLayout";

const DebtsScreen = () => {
  const [categoriesToFilter, setCategoriesToFilter] =
    useLocalStorage<DebtCategoriesToFilter>("debt-categories-to-filter", {
      type: "LEND",
      date: "ACTIVE",
      payment: "ACTIVE",
    });
  const [nameQuery, setNameQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortDebtsBy>("NEWEST");
  const [formState, setFormState] = useState<DebtFormState | null>(null);

  if (!categoriesToFilter) return null;

  return (
    <DebtsLayout
      typeToFilter={categoriesToFilter.type}
      nameQuery={nameQuery}
      onNameQueryChange={setNameQuery}
    >
      <main className="container mb-4">
        <DebtCardsWindow
          categoriesToFilter={categoriesToFilter}
          onCategoriesToFilterChange={setCategoriesToFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onFormStateChange={setFormState}
        >
          <DebtCards
            nameQuery={nameQuery}
            categoriesToFilter={categoriesToFilter}
            onFormStateChange={setFormState}
          />
        </DebtCardsWindow>
      </main>

      <DebtModal formState={formState} onClose={() => setFormState(null)} />
    </DebtsLayout>
  );
};

export default DebtsScreen;

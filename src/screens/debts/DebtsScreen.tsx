import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import DebtCards from "./components/DebtCards";
import DebtCardsWindow from "./components/DebtCardsWindow/DebtCardsWindow";
import DebtModal from "./components/DebtModal";
import DebtsLayout from "./components/DebtsLayout";
import type {
  DebtCategoriesToFilter,
  DebtFormState,
  SortDebtsBy,
} from "./types";

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

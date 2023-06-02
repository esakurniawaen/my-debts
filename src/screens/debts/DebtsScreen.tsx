import DebtCardsWindow from "./components/DebtCardsWindow";
import DebtCards from "./components/DebtCards";
import DebtModal from "./components/DebtModal";
import DebtsLayout from "./components/DebtsLayout";

const DebtsScreen = () => {
  return (
    <DebtsLayout>
      <DebtCardsWindow>
        <DebtCards />
      </DebtCardsWindow>

      <DebtModal />
    </DebtsLayout>
  );
};

export default DebtsScreen;

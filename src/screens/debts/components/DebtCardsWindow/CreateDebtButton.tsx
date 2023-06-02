import { PlusIcon } from "@heroicons/react/24/outline";
import { createId } from "@paralleldrive/cuid2";
import { useAtomValue, useSetAtom } from "jotai";
import { DateTime } from "luxon";
import { debtDefaultCurrencyAtom } from "~/atoms/debtDefaultCurrencyAtom";
import { PrimaryButton } from "~/components/buttons";
import { debtFormAtom } from "~/screens/debts/atoms/debtFormAtom";
import { debtCategoriesToFilterAtom } from "../../atoms/debtCategoriesToFilterAtom";
import { Tooltip } from "react-tooltip";

const CreateDebtButton = () => {
  const defaultCurrency = useAtomValue(debtDefaultCurrencyAtom);
  const setDebtForm = useSetAtom(debtFormAtom);
  const { type } = useAtomValue(debtCategoriesToFilterAtom);

  return (
    
      <PrimaryButton
        onClick={() =>
          setDebtForm({
            type: "ADD",
            debt: {
              type,
              transactions: [
                { type: "INITIAL", amount: 0, id: createId(), exclude: false },
              ],
              createdAt: DateTime.now().toMillis(),
              currency: defaultCurrency,
              personName: "",
              description: "",
              id: createId(),
            },
          })
        }
        color={type === "LEND" ? "YELLOW" : "LIME"}
        size="SMALL"
        data-tooltip-id="tooltip"
        data-tooltip-content="Create a new debt"
      >
        <PlusIcon className="h-6 w-6" />
        Create
      </PrimaryButton>

      
  );
};

export default CreateDebtButton;

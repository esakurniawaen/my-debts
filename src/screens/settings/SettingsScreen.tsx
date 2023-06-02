import { IconButton } from "~/components/buttons";
import { TitleHeader } from "~/components/headers";
import { Combobox } from "~/components/selects";
import { useRouter } from "next/router";
import SettingListItem from "./components/SettingListItem";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import {
  debtDefaultCurrencyAtom,
  CURRENCIES,
} from "~/atoms/debtDefaultCurrencyAtom";

const SettingsScreen = () => {
  const router = useRouter();

  const [debtDefaultCurrency, setDebtDefaultCurrency] = useAtom(
    debtDefaultCurrencyAtom
  );

  return (
    <>
      <TitleHeader
        title="Settings"
        titleAs="h1"
        LeftColumn={
          <IconButton
            data-tooltip-id="tooltip"
            data-tooltip-content="Back to previous page"
            onClick={router.back}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </IconButton>
        }
      />

      <main className="grid place-items-center px-2">
        <ul className="w-full max-w-lg">
          <SettingListItem
            title="Default currency"
            description="Set this currency as the initial currency when you try to create a new debt"
            RightColumn={
              <div className="w-24">
                <Combobox
                  options={CURRENCIES}
                  selectedOption={debtDefaultCurrency}
                  onSelectedOptionChange={(currency) =>
                    setDebtDefaultCurrency(currency)
                  }
                />
              </div>
            }
          />
        </ul>
      </main>
    </>
  );
};

export default SettingsScreen;

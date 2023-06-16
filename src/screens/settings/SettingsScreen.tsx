import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { IconButton } from "~/components/buttons";
import { TitleHeader } from "~/components/headers";
import { Combobox } from "~/components/selects";
import {
  CURRENCIES,
  useDefaultCurrencyStore,
} from "~/store/defaultCurrencyStore";
import SettingListItem from "./components/SettingListItem";
import ClientOnly from "~/components/ClientOnly";

const SettingsScreen = () => {
  const router = useRouter();

  const { defaultCurrency, setDefaultCurrency } = useDefaultCurrencyStore(
    (state) => state
  );

  return (
    <ClientOnly>
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
                  selectedOption={defaultCurrency ?? "USD"}
                  onSelectedOptionChange={(currency) =>
                    setDefaultCurrency(currency)
                  }
                />
              </div>
            }
          />
        </ul>
      </main>
    </ClientOnly>
  );
};

export default SettingsScreen;

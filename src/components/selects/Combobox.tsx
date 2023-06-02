import { Combobox as HeadlessCombobox } from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { Input } from "~/components/inputs";
import type { ElementColor } from "~/types";

interface ComboboxProps<T> {
  options: readonly T[];
  colorWhenFocused?: ElementColor;
  selectedOption: T;
  onSelectedOptionChange: (option: T) => void;
}

const Combobox = <T extends string>({
  options,
  colorWhenFocused = "BLUE",
  selectedOption,
  onSelectedOptionChange,
}: ComboboxProps<T>) => {
  const [query, setQuery] = useState("");

  const searchedOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  const handleItemSelect = (option: T) => {
    onSelectedOptionChange(option);
    setQuery("");
  };

  const hasSearchedItemsBeenFound =
    query !== "" && searchedOptions.length === 0 ? false : true;

  return (
    <div className="relative w-full">
      <HeadlessCombobox value={selectedOption} onChange={handleItemSelect}>
        {({ open }) => (
          <>
            <div className="relative">
              <HeadlessCombobox.Input
                as={Input}
                borderColorWhenFocused={colorWhenFocused}
                onChange={(e) => setQuery(e.target.value)}
              />
              <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center">
                <ChevronUpDownIcon
                  className={clsx("h-5 w-5 transition hover:text-slate-500", {
                    "text-blue-500": open && colorWhenFocused === "BLUE",
                    "text-yellow-500": open && colorWhenFocused === "YELLOW",
                    "text-lime-500": open && colorWhenFocused === "LIME",
                    "text-emerald-500": open && colorWhenFocused === "EMERALD",
                    "text-rose-500": open && colorWhenFocused === "ROSE",
                  })}
                  aria-hidden="true"
                />
              </HeadlessCombobox.Button>
            </div>

            <HeadlessCombobox.Options
              className={clsx(
                "scrollbar scrollbar-track-slate-800 scrollbar-thumb-slate-700 absolute z-30 mt-1 max-h-56 w-full overflow-y-auto rounded-md border bg-slate-800/80 shadow-lg backdrop-blur",
                {
                  "border-blue-500": colorWhenFocused === "BLUE",
                  "border-yellow-500": colorWhenFocused === "YELLOW",
                  "border-lime-500": colorWhenFocused === "LIME",
                  "border-emerald-500": colorWhenFocused === "EMERALD",
                  "border-rose-500": colorWhenFocused === "ROSE",
                }
              )}
            >
              <div className="divide-y divide-slate-700">
                {!hasSearchedItemsBeenFound ? (
                  <div className="relative cursor-default select-none px-4 py-2 text-slate-300">
                    Nothing found.
                  </div>
                ) : (
                  searchedOptions.map((option, itemIndex) => (
                    <HeadlessCombobox.Option
                      key={itemIndex}
                      className={({ active }) =>
                        clsx(
                          "relative cursor-pointer select-none list-none py-2 pl-8 pr-2",
                          {
                            "bg-blue-500/20": active && colorWhenFocused === "BLUE",
                            "bg-yellow-500/20": active && colorWhenFocused === "YELLOW",
                            "bg-lime-500/20": active && colorWhenFocused === "LIME",
                            "bg-emerald-500/20": active && colorWhenFocused === "EMERALD",
                            "bg-rose-500/20": active && colorWhenFocused === "ROSE",
                          }
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={clsx("inline-block truncate", {
                              "text-slate-200": active,
                              "text-slate-300": !active,
                            })}
                          >
                            {option}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 grid place-items-center pl-1.5">
                              <CheckIcon
                                className={clsx("h-5 w-5", {
                                  "text-blue-400": colorWhenFocused === "BLUE",
                                  "text-lime-400": colorWhenFocused === "LIME",
                                  "text-yellow-400": colorWhenFocused === "YELLOW",
                                  "text-emerald-400": colorWhenFocused === "EMERALD",
                                  "text-rose-400": colorWhenFocused === "ROSE",
                                })}
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </HeadlessCombobox.Option>
                  ))
                )}
              </div>
            </HeadlessCombobox.Options>
          </>
        )}
      </HeadlessCombobox>
    </div>
  );
};

export default Combobox;

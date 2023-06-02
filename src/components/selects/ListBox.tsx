import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import type { ElementColor } from "~/types";

interface ListBoxProps<T> {
  selectedOption: T;
  options: T[];
  onSelectedOptionChange: (value: T) => void;
  colorWhenFocused: ElementColor;
}

const ListBox = <T extends string>({
  selectedOption,
  onSelectedOptionChange,
  options,
  colorWhenFocused,
}: ListBoxProps<T>) => {
  return (
    <div className="relative">
      <Listbox value={selectedOption} onChange={onSelectedOptionChange}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={clsx(
                "group relative w-full cursor-pointer rounded-md border border-slate-700 bg-slate-900 py-2 pl-3 pr-10 text-left shadow-md transition focus:outline-none"
              )}
            >
              <span className="block truncate text-gray-300">
                {selectedOption}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-6 w-6" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <div
              className={clsx(
                "absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-slate-700 py-1 shadow-md backdrop-blur-sm focus:outline-none"
              )}
            >
              <Listbox.Options>
                {options.map((option, idx) => (
                  <Listbox.Option
                    key={idx}
                    className={({ active }) =>
                      clsx(
                        "relative cursor-pointer select-none py-2 pl-10 text-sm transition",
                        {
                          "bg-slate-800 text-slate-300": active,
                          "text-slate-400": !active,
                        }
                      )
                    }
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span>{option}</span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 grid w-10 place-items-center">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default ListBox;

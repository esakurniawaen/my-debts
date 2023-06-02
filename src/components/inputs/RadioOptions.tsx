import clsx from "clsx";
import { RadioGroup } from "@headlessui/react";
import type { ElementColor } from "~/types";

interface RadioOptionsProps<T> {
  label: string;
  options: T[];
  selectedOption: T;
  onSelectedOptionChange: (value: T) => void;
  direction?: "COLUMN" | "ROW";
  radioColorWhenSelected?: Omit<ElementColor, "DEFAULT">;
}

const RadioOptions = <T extends string>({
  label,
  options,
  selectedOption,
  onSelectedOptionChange,
  direction = "COLUMN",
  radioColorWhenSelected = "BLUE",
}: RadioOptionsProps<T>) => {
  return (
    <RadioGroup value={selectedOption} onChange={onSelectedOptionChange}>
      <RadioGroup.Label className="mb-1.5 inline-block">
        {label}
      </RadioGroup.Label>
      <div
        className={clsx("flex gap-x-3 gap-y-1.5", {
          "flex-col": direction === "COLUMN",
        })}
      >
        {options.map((option, index) => (
          <RadioGroup.Option
            className="flex cursor-pointer items-center gap-x-1"
            key={index}
            value={option}
          >
            {({ checked }) => (
              <>
                <div
                  className={clsx(
                    "grid h-4 w-4 place-items-center rounded-full",
                    !checked && "bg-slate-700",
                    checked && {
                      "bg-blue-500": radioColorWhenSelected === "BLUE",
                      "bg-emerald-500": radioColorWhenSelected === "EMERALD",
                      "bg-lime-500": radioColorWhenSelected === "LIME",
                      "bg-yellow-500": radioColorWhenSelected === "YELLOW",
                      "bg-rose-500": radioColorWhenSelected === "ROSE",
                    }
                  )}
                >
                  {checked && (
                    <div className="h-1.5 w-1.5 rounded-full bg-slate-700"></div>
                  )}
                </div>
                <span className="whitespace-nowrap">{option}</span>
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default RadioOptions;

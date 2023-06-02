import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";
import type { ElementColor, ElementSize } from "~/types";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: "FULL" | "FIT";
  color?: ElementColor;
  size?: ElementSize;
}

const SecondaryButton = ({
  color,
  width = "FIT",
  size = "MEDIUM",
  children,
  ...restProps
}: SecondaryButtonProps) => {
  return (
    <button
      className={clsx(
        "flex items-center gap-x-1 border font-semibold transition",
        {
          "w-full": width === "FULL",
          "border-slate-800 hover:border-slate-700": color === undefined,
          "border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600":
            color === "BLUE",
          "border-yellow-500/60 text-yellow-500/60 hover:border-yellow-500/50 hover:text-yellow-500/50":
            color === "YELLOW",
          "border-lime-500/60 text-lime-500/60 hover:border-lime-500/50 hover:text-lime-500/50":
            color === "LIME",
          "border-emerald-500/80 text-emerald-500/80 hover:border-emerald-500/70 hover:text-emerald-500/70":
            color === "EMERALD",
          "border-rose-500/80 text-rose-500/80 hover:border-rose-500/70 hover:text-rose-500/70":
            color === "ROSE",
          "rounded px-2 py-1": size === "SMALL",
          "rounded-md px-3 py-2": size === "MEDIUM",
          "rounded-lg px-4 py-3 text-base": size === "LARGE",
        }
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;

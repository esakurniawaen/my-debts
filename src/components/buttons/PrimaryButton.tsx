import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";
import type { ElementColor, ElementSize } from "~/types";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: "FIT" | "FULL";
  color?: ElementColor;
  size?: ElementSize;
}

const PrimaryButton = ({
  disabled,
  children,
  width = "FIT",
  color,
  size = "MEDIUM",
  ...restProps
}: PrimaryButtonProps) => {
  return (
    <button
      className={clsx(
        "flex items-center gap-x-1 font-semibold text-slate-200 transition",
        {
          "bg-blue-500 hover:bg-blue-600": color === "BLUE",
          "bg-yellow-500/60 hover:bg-yellow-500/50": color === "YELLOW",
          "bg-lime-500/60 hover:bg-lime-500/50": color === "LIME",
          "bg-emerald-500/80 hover:bg-emerald-500/70": color === "EMERALD",
          "bg-rose-500/80 hover:bg-rose-500/70": color === "ROSE",
          "bg-slate-800 hover:bg-slate-900": color === undefined,
          "rounded px-2 py-1": size === "SMALL",
          "rounded-md px-3 py-2": size === "MEDIUM",
          "rounded-lg px-4 py-3 text-base": size === "LARGE",
          "cursor-not-allowed opacity-50": disabled,
          "w-full justify-center": width === "FULL",
        }
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

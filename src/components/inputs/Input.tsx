import clsx from "clsx";
import { type InputHTMLAttributes, forwardRef } from "react";
import type { ElementColor, ElementSize } from "~/types";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  borderColorWhenFocused?: ElementColor;
  size?: ElementSize;
  roundedLeft?: boolean;
  roundedRight?: boolean;
  roundedTop?: boolean;
  roundedBottom?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      roundedLeft = true,
      roundedRight = true,
      roundedTop = true,
      roundedBottom = true,
      size = "MEDIUM",
      borderColorWhenFocused = "BLUE",
      ...restProps
    },
    ref
  ) => {
    return (
      <input
        className={clsx(
          "w-full border border-slate-800 bg-slate-900 text-slate-300 outline-none transition placeholder:text-slate-500",
          {
            "focus:border-blue-500": borderColorWhenFocused === "BLUE",
            "focus:border-yellow-500": borderColorWhenFocused === "YELLOW",
            "focus:border-lime-500": borderColorWhenFocused === "LIME",
            "focus:border-emerald-500": borderColorWhenFocused === "EMERALD",
            "focus:border-rose-500": borderColorWhenFocused === "ROSE",
            "rounded-r-md": !roundedLeft,
            "rounded-l-md": !roundedRight,
            "rounded-b-md": !roundedTop,
            "rounded-t-md": !roundedBottom,
            "rounded-md":
              roundedLeft && roundedTop && roundedRight && roundedBottom,
            "px-2 py-1": size === "SMALL",
            "px-3 py-2": size === "MEDIUM",
            "px-4 py-3 text-base": size === "LARGE",
          }
        )}
        type="text"
        ref={ref}
        {...restProps}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;

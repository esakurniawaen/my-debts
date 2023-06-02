import clsx from "clsx";
import {
  type ButtonHTMLAttributes,
  type ReactElement,
  forwardRef,
} from "react";
import type { ElementSize } from "~/types";

interface CommonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactElement;
  size?: ElementSize;
}

interface IconVariantProp extends CommonProps {
  variant?: "ICON";
}
interface ContainedVariantProps extends CommonProps {
  variant?: "CONTAINED";
  backgroundColor?: "SLATE_800" | "SLATE_700";
}
interface OutlinedVariantProps extends CommonProps {
  variant?: "OUTLINED";
  outlineColor?: "SLATE_800" | "SLATE_700";
}

type IconButtonProps =
  | IconVariantProp
  | ContainedVariantProps
  | OutlinedVariantProps;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    return (
      <button
        className={clsx(
          "select-none transition hover:bg-slate-800/30 active:scale-90",
          {
            "rounded p-1": props.size === "SMALL",
            "rounded-md p-1.5":
              props.size === "MEDIUM" || props.size === undefined,
            "rounded-lg p-2": props.size === "LARGE",
            "bg-transparent": props.variant === "ICON",
            "bg-slate-800":
              props.variant === "CONTAINED" &&
              (props.backgroundColor === "SLATE_800" ||
                props.backgroundColor === undefined),
            "bg-slate-700":
              props.variant === "CONTAINED" &&
              props.backgroundColor === "SLATE_700",
            "border border-slate-800":
              props.variant === "OUTLINED" &&
              (props.outlineColor === "SLATE_800" ||
                props.outlineColor === undefined),
            "border border-slate-700":
              props.variant === "OUTLINED" &&
              props.outlineColor === "SLATE_700",
          }
        )}
        ref={ref}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;

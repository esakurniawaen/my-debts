import { forwardRef } from "react";
import { NumericFormat } from "react-number-format";
import Input, { type InputProps } from "./Input";

interface MoneyInputProps
  extends Omit<InputProps, "onChange" | "value" | "type" | "defaultValue"> {
  onChange: (value: number | undefined) => void;
  value: number | undefined
}

const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ onChange, value, ...rest }, ref) => {
    return (
      <NumericFormat
        getInputRef={ref}
        customInput={Input}
        valueIsNumericString
        allowNegative={false}
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale
        value={value}
        onValueChange={(values) => onChange(values.floatValue )}
        {...rest}
      />
    );
  }
);

MoneyInput.displayName = "MoneyInput";

export default MoneyInput;

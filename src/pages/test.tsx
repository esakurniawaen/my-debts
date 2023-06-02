import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { Input, MoneyInput } from "~/components/inputs";

export default function Test() {
  const [amount, setAmount] = useState(0);

  return (
    <div>
      <NumericFormat
        valueIsNumericString
        allowNegative={false}
        thousandSeparator
        decimalScale={2}
        fixedDecimalScale
        value={amount || undefined}
        onValueChange={(values, srcInfo) => setAmount(values.floatValue ?? 0)}
      />
    </div>
  );
}

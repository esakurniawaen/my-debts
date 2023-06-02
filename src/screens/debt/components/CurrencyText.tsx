import { NumericFormat, type NumericFormatProps } from "react-number-format";

interface CurrencyTextProps {
  value: NumericFormatProps["value"];
  prefix?: NumericFormatProps["prefix"];
  className?: string;
}

const CurrencyText = ({ value, prefix, className }: CurrencyTextProps) => {
  return (
    <NumericFormat
      className={className}
      prefix={prefix}
      value={value}
      thousandSeparator={true}
      displayType="text"
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
};

export default CurrencyText;

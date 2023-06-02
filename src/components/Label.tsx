import clsx from 'clsx';

interface LabelProps {
  removeMarginBottom?: boolean;
  htmlFor: string;
  text: string;
}

const Label = ({ htmlFor, text, removeMarginBottom = false }: LabelProps) => {
  return (
    <>
      <label
        className={clsx('inline-block font-sans font-semibold  ', {
          'mb-1.5': removeMarginBottom === false,
        })}
        htmlFor={htmlFor}
      >
        {text}
      </label>
    </>
  );
};

export default Label;

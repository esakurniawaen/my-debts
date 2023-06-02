import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useEffectOnce, useUpdateEffect } from "react-use";

interface ReadMoreReadLessProps {
  children: string;
  charLimit?: number;
  alwaysFullTextWhen?: boolean;
}

const ReadMoreReadLess = ({
  children,
  charLimit = 150,
  alwaysFullTextWhen = false,
}: ReadMoreReadLessProps) => {
  const [isFullText, setIsFullText] = useState(children.length < charLimit);

  useEffectOnce(() => {
    if (alwaysFullTextWhen) {
      setIsFullText(true);
    }
  });

  useUpdateEffect(() => {
    setIsFullText(alwaysFullTextWhen);
  }, [alwaysFullTextWhen]);

  const toggleFullText = () => {
    setIsFullText((prev) => !prev);
  };

  return (
    <div className="inline ">
      {isFullText ? children : `${children.substr(0, charLimit)}...`}{" "}
      {children.length > charLimit && (
        <button
          className="inline-flex items-center justify-center text-blue-400"
          onClick={toggleFullText}
        >
          {isFullText ? (
            <>
              less <ChevronUpIcon className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              more <ChevronDownIcon className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default ReadMoreReadLess;

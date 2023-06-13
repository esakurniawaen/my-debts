import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface ReadMoreReadLessProps {
  children: string;
  charLimit?: number;
  alwaysFullTextWhen?: boolean;
}

const ReadMoreReadLess = ({
  children,
  charLimit = 150,
}: ReadMoreReadLessProps) => {
  const [isFullText, setIsFullText] = useState(children.length < charLimit);

  const toggleFullText = () => {
    setIsFullText((prev) => !prev);
  };

  const textExceedsTheLimit = children.length > charLimit;

  return (
    <div className="inline">
      {isFullText ? children : `${children.substr(0, charLimit)}...`}{" "}
      {textExceedsTheLimit && (
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

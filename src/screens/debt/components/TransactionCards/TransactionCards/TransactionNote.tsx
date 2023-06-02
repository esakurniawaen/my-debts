// import { Disclosure } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import clsx from "clsx";
// import { useAtomValue } from "jotai";
// import Highlighter from "react-highlight-words";
// import { noteQueryAtom } from "~/screens/debt/atoms/noteQueryAtom";
// import { type TransactionColor } from "~/screens/debt/types";

// type TransactionNoteProps = {
//   note: string | undefined;
//   color: TransactionColor;
// };

// export default function TransactionNote({ note, color }: TransactionNoteProps) {
//   const noteQuery = useAtomValue(noteQueryAtom);

//   return (
//     <Disclosure>
//       {({ open }) => (
//         <>
//           <Disclosure.Button className="flex gap-1 rounded-md bg-slate-800 px-2 py-1 text-xs">
//             <span>Note</span>
//             <ChevronDownIcon
//               className={clsx("h-5 w-5", {
//                 "rotate-180": open,
//                 "text-rose-400": color === "ROSE",
//                 "text-emerald-400": color === "EMERALD",
//               })}
//             />
//           </Disclosure.Button>
//           {((open && note !== "") || noteQuery !== "") && (
//             <Disclosure.Panel
//               static
//               className="mt-1 w-full rounded-lg bg-slate-800 p-2"
//             >
//               <Highlighter
//                 className="text-sm"
//                 highlightClassName={clsx("rounded-sm", {
//                   "text-red bg-slate-700": color === "ROSE",
//                   "text-teal bg-slate-700": color === "EMERALD",
//                 })}
//                 searchWords={[noteQuery]}
//                 textToHighlight={note ?? ""}
//               />
//             </Disclosure.Panel>
//           )}
//         </>
//       )}
//     </Disclosure>
//   );
// }

import { useAtomValue } from "jotai";
import { useState } from "react";
import { useUpdateEffect } from "react-use";
import ReadMoreReadLess from "~/components/ReadMoreReadLess";
import { noteQueryAtom } from "~/screens/debt/atoms/noteQueryAtom";
import { type TransactionColor } from "~/screens/debt/types";

type TransactionNoteProps = {
  note: string | undefined;
  colorOfNoteModeButton: TransactionColor;
};

export default function TransactionNote({
  note,
  colorOfNoteModeButton,
}: TransactionNoteProps) {
  const noteQuery = useAtomValue(noteQueryAtom);

  const [noteMode, setNoteMode] = useState<"SHRINK" | "EXPAND">("SHRINK");

  const toggleNoteMode = () => {
    setNoteMode(noteMode === "SHRINK" ? "EXPAND" : "SHRINK");
  };

  useUpdateEffect(() => {
    setNoteMode(noteQuery === "" ? "SHRINK" : "EXPAND");
  }, [noteQuery]);

  if (!note) return null;

  return (
    <>
      <div className="flex items-start gap-x-1">
        {/* <p
          className={clsx({
            truncate: noteMode === "SHRINK",
          })}
        >
          Note: {note || "Unset"}
        </p>
        <button className="flex items-center text-xs text-blue-400" onClick={toggleNoteMode}>
          {noteMode === "SHRINK" ? (
            <>
              More <ChevronDownIcon className="h-4 w-4" />
            </>
          ) : (
            <>
              Less <ChevronUpIcon className="h-4 w-4" />
            </>
          )}

        </button> */}
        Note:
        <ReadMoreReadLess alwaysFullTextWhen={noteQuery !== ""} charLimit={150}>
          {note}
        </ReadMoreReadLess>
      </div>
    </>
  );
}

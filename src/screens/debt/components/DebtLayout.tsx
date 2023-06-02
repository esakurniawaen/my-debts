import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import { IconButton } from "~/components/buttons";
import { SearchHeader } from "~/components/headers";
import { noteQueryAtom } from "../atoms/noteQueryAtom";
import TransactionButtons from "./TransactionButtons";
import type { Debt } from "~/atoms/debtsAtom";

type DebtLayoutProps = {
  children: ReactNode;
  debtType: Debt["type"];
  debtId: string;
};

export default function DebtLayout({
  children,
  debtId,
  debtType,
}: DebtLayoutProps) {
  const router = useRouter();
  const [noteQuery, setNoteQuery] = useAtom(noteQueryAtom);

  return (
    <>
      <SearchHeader
        LeftColumn={
          <IconButton
            data-tooltip-id="tooltip"
            data-tooltip-content="Back to previous page"
            onClick={router.back}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </IconButton>
        }
        onSearchChange={(e) => setNoteQuery(e.target.value)}
        search={noteQuery}
        searchPlaceholder="Search transactions..."
        RightColumn={
          <div className="hidden items-center gap-x-3 lg:flex">
            <TransactionButtons debtId={debtId} debtType={debtType} />
          </div>
        }
      />

      {children}
    </>
  );
}

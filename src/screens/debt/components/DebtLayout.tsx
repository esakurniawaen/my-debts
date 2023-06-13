import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import type { Debt } from "~/types";
import { IconButton } from "~/components/buttons";
import { SearchHeader } from "~/components/headers";
import TransactionButtons from "./TransactionButtons";
import ClientOnly from "~/components/ClientOnly";
import type { TransactionFormState } from "../types";

type DebtLayoutProps = {
  children: ReactNode;
  debt: Debt;
  noteQuery: string;
  onNoteQueryChange: (noteQuery: string) => void;
  onFormStateChange: (formState: TransactionFormState) => void;
};

export default function DebtLayout({
  children,
  debt,
  noteQuery,
  onNoteQueryChange,
  onFormStateChange,
}: DebtLayoutProps) {
  const router = useRouter();

  return (
    <ClientOnly>
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
        onSearchChange={(e) => onNoteQueryChange(e.target.value)}
        search={noteQuery}
        searchPlaceholder="Search transactions..."
        RightColumn={
          <div className="hidden items-center gap-x-3 lg:flex">
            <TransactionButtons
              debt={debt}
              onFormStateChange={onFormStateChange}
            />
          </div>
        }
      />

      {children}
    </ClientOnly>
  );
}

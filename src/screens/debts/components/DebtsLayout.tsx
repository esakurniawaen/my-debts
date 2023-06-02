import { Bars3Icon } from "@heroicons/react/24/outline";
import { useAtom, useAtomValue } from "jotai";
import { useState, type ReactNode } from "react";
import Sidebar from "~/components/Sidebar";
import { IconButton } from "~/components/buttons";
import { SearchHeader } from "~/components/headers";
import { debtCategoriesToFilterAtom } from "../atoms/debtCategoriesToFilterAtom";
import { nameQueryAtom } from "../atoms/nameQueryAtom";

type DebtsLayoutProps = {
  children: ReactNode;
};

export default function DebtsLayout({ children }: DebtsLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const debtCategoriesToFilter = useAtomValue(debtCategoriesToFilterAtom);

  const [nameQuery, setNameQuery] = useAtom(nameQueryAtom);
  return (
    <>
      <SearchHeader
        searchInputColorWhenFocused={
          debtCategoriesToFilter.type === "LEND" ? "YELLOW" : "LIME"
        }
        onSearchChange={(e) => setNameQuery(e.target.value)}
        search={nameQuery}
        searchPlaceholder={
          debtCategoriesToFilter.type === "LEND"
            ? "Search lends..."
            : "Search borrows..."
        }
        LeftColumn={
         
            <IconButton
              data-tooltip-id="tooltip"
              data-tooltip-content="Open the sidebar"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Bars3Icon className="h-6 w-6" aria-label="Open sidebar" />
            </IconButton>

           
        }
      />

      <Sidebar open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {children}
    </>
  );
}

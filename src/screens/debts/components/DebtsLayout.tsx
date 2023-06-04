import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState, type ReactNode } from "react";
import { type Debt } from "~/atoms/debtsAtom";
import Sidebar from "~/components/Sidebar";
import { IconButton } from "~/components/buttons";
import { SearchHeader } from "~/components/headers";

type DebtsLayoutProps = {
  children: ReactNode;
  nameQuery: string;
  onNameQueryChange: (nameQuery: string) => void;
  typeToFilter: Debt["type"];
};

export default function DebtsLayout({
  children,
  nameQuery,
  onNameQueryChange,
  typeToFilter,
}: DebtsLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <SearchHeader
        searchInputColorWhenFocused={
          typeToFilter === "LEND" ? "YELLOW" : "LIME"
        }
        onSearchChange={(e) => onNameQueryChange(e.target.value)}
        search={nameQuery}
        searchPlaceholder={
          typeToFilter === "LEND" ? "Search lends..." : "Search borrows..."
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

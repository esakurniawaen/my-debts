import clsx from "clsx";
import { Input } from "../inputs";
import {
  type ChangeEventHandler,
  type ReactElement,
  type ReactNode,
  useState,
} from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { ElementColor } from "~/types";

interface SearchHeaderProps {
  onSearchChange: ChangeEventHandler<HTMLInputElement> | undefined;
  LeftColumn: ReactElement;
  searchPlaceholder: string;
  RightColumn?: ReactNode;
  search: string;
  searchInputColorWhenFocused?: ElementColor;
}

const SearchHeader = ({
  LeftColumn,
  onSearchChange,
  searchPlaceholder,
  searchInputColorWhenFocused = "BLUE",
  search,
  RightColumn,
}: SearchHeaderProps) => (
  <header className="mb-4 flex w-full items-center justify-between px-4 py-3 shadow-lg backdrop-blur lg:px-6 lg:py-4">
    <div className="flex w-full max-w-xs items-center justify-center gap-2 md:gap-3 lg:gap-4">
      {LeftColumn}
      <SearchInput
        colorWhenFocused={searchInputColorWhenFocused}
        value={search}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />
    </div>

    {RightColumn}
  </header>
);

export default SearchHeader;

interface SearchInputProps {
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  placeholder?: string;
  value: string;
  colorWhenFocused: ElementColor;
}

const SearchInput = ({
  placeholder,
  onChange,
  value,
  colorWhenFocused,
}: SearchInputProps) => {
  const [isSearchInputGetFocused, setIsSearchInputGetFocused] = useState(false);

  return (
    <div className="flex grow">
      <label
        htmlFor="search-input"
        className=" rounded-l-md bg-slate-800 p-2.5"
      >
        <MagnifyingGlassIcon
          className={clsx("h-4 w-4", {
            "text-yellow-400":
              isSearchInputGetFocused && colorWhenFocused === "YELLOW",
            "text-lime-400":
              isSearchInputGetFocused && colorWhenFocused === "LIME",
            "text-emerald-400":
              isSearchInputGetFocused && colorWhenFocused === "EMERALD",
            "text-rose-400":
              isSearchInputGetFocused && colorWhenFocused === "ROSE",
            "text-blue-500":
              isSearchInputGetFocused && colorWhenFocused === "BLUE",
          })}
        />
        <span className="sr-only">Search input</span>
      </label>

      <Input
        id="search-input"
        type="search"
        roundedLeft={false}
        borderColorWhenFocused={colorWhenFocused}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsSearchInputGetFocused(true)}
        onBlur={() => setIsSearchInputGetFocused(false)}
      />
    </div>
  );
};

import type { ReactElement, ReactHTML, ReactNode } from "react";

interface TitleHeaderProps {
  title: string;
  RightColumn?: ReactNode;
  titleAs: keyof ReactHTML;
  LeftColumn: ReactElement;
}

const TitleHeader = ({
  title,
  LeftColumn,
  titleAs,
  RightColumn,
}: TitleHeaderProps) => {
  const Tag = titleAs ?? "span";
  return (
    <header className="mb-4 w-full bg-slate-900 px-4 py-3 shadow-md lg:px-6 lg:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 md:gap-x-3 lg:gap-x-4">
          {LeftColumn}
          <Tag className="text-xl font-semibold">{title}</Tag>
        </div>
        {RightColumn}
      </div>
    </header>
  );
};

export default TitleHeader;

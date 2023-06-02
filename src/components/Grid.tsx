import type { ReactHTML, ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  as?: keyof ReactHTML;
}

const Grid = ({ children, as }: GridProps) => {
  const As = as ?? "div";

  return (
    <As className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {children}
    </As>
  );
};

export default Grid;

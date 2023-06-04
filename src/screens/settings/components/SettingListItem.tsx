import type { ReactNode } from "react";
import ReadMoreReadLess from "~/components/ReadMoreReadLess";

interface SettingListItemProps {
  title: string;
  description?: string;
  RightColumn?: ReactNode;
}

const SettingListItem = ({
  title,
  description = "",
  RightColumn,
}: SettingListItemProps) => {
  return (
    <li className="flex items-center justify-between rounded-lg border border-slate-900 px-4 py-3 shadow-md">
      <div className="w-4/6 cursor-default">
        <span className="block text-base text-slate-300">{title}</span>
        {description && (
          <ReadMoreReadLess charLimit={40}>{description}</ReadMoreReadLess>
        )}
      </div>
      {RightColumn}
    </li>
  );
};

export default SettingListItem;

import type { ReactNode } from "react";

interface SettingListItemProps {
  title: string;
  description?: string;
  RightColumn?: ReactNode;
}

const SettingListItem = ({
  title,
  description,
  RightColumn,
}: SettingListItemProps) => {
  return (
    <li className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 shadow-md">
      <div className="w-4/6 cursor-default">
        <span className="block text-slate-300   ">{title}</span>
        <span className="block truncate transition hover:whitespace-normal    ">
          {description}
        </span>
      </div>
      {RightColumn}
    </li>
  );
};

export default SettingListItem;

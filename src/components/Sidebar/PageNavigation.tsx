import {
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";

const PageNavigation = () => {
  return (
    <nav>
      <h2 className="sr-only">Page Navigation</h2>
      <ul>
        <NavigationItem
          label="Debts"
          icon={
            <ListBulletIcon className="h-5 w-5" />
          }
          href="/"
        />
        <NavigationItem
          label="Settings"
          icon={
            <Cog6ToothIcon className="h-5 w-5" />
          }
          href="/settings"
        />
        <NavigationItem
          label="Feedback"
          icon={
            <ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
          }
          href="/give-feedback"
        />
      </ul>
    </nav>
  );
};

export default PageNavigation;

interface NavigationItemProps {
  label: string;
  icon: ReactElement;
  href: string;
}

const NavigationItem = ({ href, icon, label }: NavigationItemProps) => {
  const router = useRouter();
  const currentPage = href === router.pathname;

  return (
    <li
      className={clsx(
        "relative flex transition items-center gap-2 px-4 py-3",
        {
          "bg-blue-500/30 text-slate-300": currentPage,
          "hover:bg-slate-600/10": !currentPage,
        }
      )}
    >
      {icon}
      <Link href={href}>
        <span>
          {label}
          <span className="absolute inset-0" />
        </span>
      </Link>
    </li>
  );
};

import { Menu } from "@headlessui/react";
import clsx from "clsx";
import { Tooltip } from "react-tooltip";
import { IconButton } from "~/components/buttons";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

interface CardMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const CardMenu = ({ onEdit, onDelete }: CardMenuProps) => {
  return (
    <Menu>
      <div className="relative">
        <Menu.Button
          data-tooltip-id="tooltip"
          data-tooltip-content="More options"
          as={IconButton}
        >
          <EllipsisVerticalIcon className="h-6 w-6" />
        </Menu.Button>

        

        <Menu.Items className="absolute right-10 top-1/2 h-fit -translate-y-1/2 rounded-md bg-slate-800 shadow-md focus-within:outline-none focus:outline-none">
          <div className="flex flex-col divide-y divide-slate-700 p-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onEdit}
                  className={clsx(
                    "block whitespace-nowrap rounded px-5 py-1 text-left transition",
                    active && "bg-slate-300/10 text-slate-300"
                  )}
                >
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onDelete}
                  className={clsx(
                    "block whitespace-nowrap rounded px-5 py-1 text-left text-red-400 transition",
                    active && " bg-red-400/10 text-rose-500 "
                  )}
                >
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </div>
    </Menu>
  );
};

export default CardMenu;

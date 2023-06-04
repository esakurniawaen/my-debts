import { Popover } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { DateTime } from "luxon";
import type { Currency } from "~/atoms/debtDefaultCurrency";
import { toDatetimeLocal, toLocaleString } from "~/utils";
import Image from "next/image";

type DebtDetailsProps = {
  currency: Currency;
  phoneNumber: string | undefined;
  description: string | undefined;
  createdAt: number;
  personName: string;
  dueAt: number | undefined;
};

export default function DebtDetails({
  currency,
  phoneNumber,
  description,
  createdAt,
  personName,
  dueAt,
}: DebtDetailsProps) {
  return (
    <figure className="flex items-center gap-2 rounded-lg p-3 lg:p-4">
      <Popover className="relative">
        <Popover.Button className="grid w-11 place-items-center outline-none">
          <Image
            className="rounded-full"
            width={50}
            height={50}
            src="/images/default-avatar.png"
            alt="Avatar"
          />
        </Popover.Button>

        <Popover.Panel className="absolute left-0 top-12 w-72 rounded-lg bg-slate-900">
          <ul className="flex flex-col divide-y divide-slate-900 py-1">
            <li className=" w px-4 py-2">Currency: {currency}</li>
            {phoneNumber && (
              <li className="flex gap-x-1 px-4 py-2">
                <span>Phone number:</span>
                <span>{phoneNumber}</span>
              </li>
            )}
            {description && (
              <li className="flex gap-x-1 px-4 py-2">
                <span>Description:</span>
                <span>{description}</span>
              </li>
            )}
          </ul>
        </Popover.Panel>
      </Popover>

      <figcaption className="grid w-full items-center">
        <h1 className="notranslate truncate font-semibold hover:whitespace-normal  ">
          {personName}
        </h1>
        <div className="flex gap-x-2 text-xs font-semibold text-slate-500">
          <span>
            Since:{" "}
            <time dateTime={toDatetimeLocal(createdAt)}>
              {toLocaleString(createdAt, DateTime.DATETIME_MED)}
            </time>
          </span>
          <ChevronRightIcon aria-hidden="true" className="h-4 w-4" />
          <span>
            Due:{" "}
            <time dateTime={dueAt ? toDatetimeLocal(dueAt) : undefined}>
              {dueAt ? toLocaleString(dueAt, DateTime.DATETIME_MED) : "Unset"}
            </time>
          </span>
        </div>
      </figcaption>
    </figure>
  );
}

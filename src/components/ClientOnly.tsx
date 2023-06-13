import { Fragment, type HTMLAttributes, type ReactHTML } from "react";
import { useIsClient } from "usehooks-ts";
interface ClientOnlyProps extends HTMLAttributes<HTMLElement> {
  as?: keyof ReactHTML;
}

const ClientOnly = ({
  children,

  as,
  ...restProps
}: ClientOnlyProps) => {
  const Tag = as || Fragment;

  const isClient = useIsClient();
  if (!isClient) return null;

  return <Tag {...restProps}>{children}</Tag>;
};

export default ClientOnly;

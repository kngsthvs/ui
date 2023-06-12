import NextLink from "next/link";
import { forwardRef } from "react";
import { LinkType, type LinkProps } from "../../types";

export const Link = forwardRef<LinkType, LinkProps>(
  ({ href, ...props }, ref) => {
    if (href)
      return href.includes("://") ? (
        <a rel="noreferrer" target="_blank" {...{ href, ref, ...props }} />
      ) : (
        <NextLink {...{ href, ref, ...props }} />
      );

    return <button {...{ ref, ...props }} />;
  }
);

Link.displayName = "Link";

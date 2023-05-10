import NextLink from "next/link";
import { forwardRef } from "react";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
export type LinkType = HTMLAnchorElement & HTMLButtonElement;

export const Link = forwardRef<LinkType, LinkProps>(
  ({ children, href, ...props }, ref) => {
    if (href)
      return href.includes("://") ? (
        <a rel="noreferrer" target="_blank" {...{ href, ref, ...props }}>
          {children}
        </a>
      ) : (
        <NextLink {...{ href, ref, ...props }}>{children}</NextLink>
      );

    return (
      <button role="link" {...{ ref, ...props }}>
        {children}
      </button>
    );
  }
);

Link.displayName = "Link";

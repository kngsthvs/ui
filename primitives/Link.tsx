import NextLink from "next/link";
import { forwardRef } from "react";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
export type LinkType = HTMLAnchorElement & HTMLButtonElement;

export const Link = forwardRef<LinkType, LinkProps>(
  ({ children, href, type = "button", ...props }, ref) => {
    if (href)
      return href.includes("://") ? (
        <a
          rel="noreferrer"
          role="button"
          target="_blank"
          {...{ href, ref, ...props }}
        >
          {children}
        </a>
      ) : (
        <NextLink role="button" {...{ href, ref, ...props }}>
          {children}
        </NextLink>
      );

    return <button {...{ ref, type, ...props }}>{children}</button>;
  }
);

Link.displayName = "Link";

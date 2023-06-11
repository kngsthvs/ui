import NextLink from "next/link";
import { forwardRef } from "react";

// Button

export const Button = forwardRef<LinkType, LinkProps>(
  ({ type = "button", ...props }, ref) => {
    return <Link {...{ ref, type, ...props }} />;
  }
);

Button.displayName = "Button";

// Link

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;
export type LinkType = HTMLAnchorElement & HTMLButtonElement;

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

export { SkipNavContent, SkipNavLink } from "@reach/skip-nav";
export { Balancer } from "react-wrap-balancer";

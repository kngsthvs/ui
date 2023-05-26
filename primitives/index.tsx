import NextLink from "next/link";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from "react";

// Button

export const Button = forwardRef<LinkType, LinkProps>(
  ({ type = "button", ...props }, ref) => {
    return <Link {...{ ref, type, ...props }} />;
  }
);

Button.displayName = "Button";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;
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

export { Balancer } from "react-wrap-balancer";

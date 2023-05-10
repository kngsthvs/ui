import { forwardRef } from "react";
import { Link, type LinkProps, type LinkType } from "./Link";

export const Button = forwardRef<LinkType, LinkProps>(
  ({ type = "button", ...props }, ref) => {
    return <Link role="button" {...{ ref, type, ...props }} />;
  }
);

Button.displayName = "Button";

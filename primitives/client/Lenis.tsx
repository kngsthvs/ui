/**
 * @tutorial https://github.com/studio-freight/react-lenis
 */

import { Lenis as ReactLenis } from "@studio-freight/react-lenis";

export function Lenis({
  children,
  root,
}: React.PropsWithChildren<{ root?: boolean }>) {
  return <ReactLenis {...{ root }}>{children}</ReactLenis>;
}

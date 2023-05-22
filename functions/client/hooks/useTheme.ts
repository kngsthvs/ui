import { useContext } from "react";
import { Theme } from "../context";

export function useTheme() {
  const context = useContext(Theme.Context);

  if (context === undefined) {
    throw new Error("useTheme must be used within an Theme.Provider");
  }

  return context;
}

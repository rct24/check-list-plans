import { createContext, useContext } from "react";

export const SideBarContext = createContext(null);

export function useSideBarContext() {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error(
      "useSideBarContext must be used within an SideBarContextProvider"
    );
  }
  return context;
}

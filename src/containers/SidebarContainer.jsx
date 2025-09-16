import Sidebar from "../components/Sidebar";
import { SideBarContextProvider } from "../context/SideBarContextProvider";

export default function SidebarContainer() {
  return (
    <SideBarContextProvider>
      <Sidebar />
    </SideBarContextProvider>
  );
}

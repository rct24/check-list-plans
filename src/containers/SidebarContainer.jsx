import Sidebar from "../components/Sidebar";
import { SideBarContextProvider } from "../context/SideBarContextProvider";

export default function SidebarContainer({ width }) {
  return (
    <SideBarContextProvider>
      <Sidebar width={width} />
    </SideBarContextProvider>
  );
}

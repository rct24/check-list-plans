import PdfViewerContainer from "./containers/PdfViewerContainer";
import SidebarContainer from "./containers/SidebarContainer";
import ResizeHandle from "./components/ResizeHandle";
import { AppContextProvider } from "./context/AppContextProvider";
import { useResizableSidebar } from "./hooks/useResizableSidebar";

function App() {
  const { sidebarWidth, isResizing, resizeHandleRef, handleResizeStart } =
    useResizableSidebar();

  return (
    <AppContextProvider>
      <div className="container-fluid p-0 d-flex">
        <PdfViewerContainer sidebarWidth={sidebarWidth} />
        <ResizeHandle
          ref={resizeHandleRef}
          width={sidebarWidth}
          isResizing={isResizing}
          onPointerDown={handleResizeStart}
        />
        <SidebarContainer width={sidebarWidth} />
      </div>
    </AppContextProvider>
  );
}

export default App;

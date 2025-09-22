import { useState, useEffect } from "react";
import PdfViewer from "./components/PdfViewer";
import SidebarContainer from "./containers/SidebarContainer";
import ResizeHandle from "./components/ResizeHandle";
import { AppContextProvider } from "./context/AppContextProvider";

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [isResizing, setIsResizing] = useState(false);

  const handleSetSidebarWidth = (newWidth) => {
    const clampedWidth = Math.min(Math.max(newWidth, 200), 600);
    setSidebarWidth(clampedWidth);
  };

  const handleSetIsResizing = (value) => {
    setIsResizing(value);
  };

  const handleMouseMove = (e) => {
    if (!isResizing) return;
    const newWidth = window.innerWidth - e.clientX;
    handleSetSidebarWidth(newWidth);
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", () => handleSetIsResizing(false));
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", () => handleSetIsResizing(false));
    };
  }, [isResizing]);

  return (
    <AppContextProvider>
      <div className="container-fluid">
        <PdfViewer sidebarWidth={sidebarWidth} />
        <ResizeHandle
          width={sidebarWidth}
          isResizing={isResizing}
          onMouseDown={() => handleSetIsResizing(true)}
        />
        <SidebarContainer width={sidebarWidth} />
      </div>
    </AppContextProvider>
  );
}

export default App;

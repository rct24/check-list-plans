import { useState, useRef, useEffect } from "react";
import PdfViewer from "./components/PdfViewer";
import SidebarContainer from "./containers/SidebarContainer";
import ResizeHandle from "./components/ResizeHandle";
import { AppContextProvider } from "./context/AppContextProvider";

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartWidthRef = useRef(350);
  const resizeHandleRef = useRef(null);
  const currentWidthRef = useRef(350);

  const handleResizeStart = (e) => {
    console.log("Resize start", e.clientX);
    dragStartXRef.current = e.clientX;
    dragStartWidthRef.current = sidebarWidth;
    currentWidthRef.current = sidebarWidth;
    setIsResizing(true);
    document.body.style.cursor = "ew-resize";
    document.body.classList.add("user-select-none");

    if (resizeHandleRef.current) {
      resizeHandleRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handleResizeEnd = (e) => {
    if (!isResizing) return;

    console.log("Resize end", currentWidthRef.current);

    if (e && e.pointerId && resizeHandleRef.current) {
      try {
        resizeHandleRef.current.releasePointerCapture(e.pointerId);
      } catch (err) {
        console.log("Error releasing pointer:", err);
      }
    }
    setSidebarWidth(currentWidthRef.current);
    setIsResizing(false);
    document.body.style.cursor = "";
    document.body.classList.remove("user-select-none");
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isResizing) return;

      console.log("Pointer move", e.clientX);

      const delta = dragStartXRef.current - e.clientX;
      const newWidth = Math.min(
        Math.max(dragStartWidthRef.current + delta, 200),
        600
      );

      currentWidthRef.current = newWidth;

      if (resizeHandleRef.current) {
        const handlePosition = window.innerWidth - newWidth - 8;
        resizeHandleRef.current.style.left = `${handlePosition}px`;
      }
    };

    const handlePointerUp = (e) => {
      console.log("Global pointer up");
      handleResizeEnd(e);
    };

    if (isResizing) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      window.addEventListener("pointercancel", handlePointerUp);
      window.addEventListener("blur", () => handleResizeEnd());
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("blur", () => handleResizeEnd());
    };
  }, [isResizing]);

  return (
    <AppContextProvider>
      <div className="container-fluid p-0">
        <PdfViewer sidebarWidth={sidebarWidth} />
        <ResizeHandle
          forwardedRef={resizeHandleRef}
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

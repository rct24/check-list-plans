import { useState, useRef, useEffect } from "react";
import PdfViewerContainer from "./containers/PdfViewerContainer";
import SidebarContainer from "./containers/SidebarContainer";
import ResizeHandle from "./components/ResizeHandle";
import { AppContextProvider } from "./context/AppContextProvider";
import AddPdfTabContent from "./components/TabBar/AddPdfTabContent";

function App() {
  const INITIAL_SIDEBAR_WIDTH = 350;

  const [sidebarWidth, setSidebarWidth] = useState(INITIAL_SIDEBAR_WIDTH);
  const [isResizing, setIsResizing] = useState(false);
  const dragStartXRef = useRef(0);
  const dragStartWidthRef = useRef(INITIAL_SIDEBAR_WIDTH);
  const resizeHandleRef = useRef(null);
  const currentWidthRef = useRef(INITIAL_SIDEBAR_WIDTH);
  const [planList, setPlanList] = useState([
    //"R501_Plan cofraj stalp S1",
    //"R502_Plan armare stalp S1",
    // "R503_Plan cofraj stalp S2",
    // "R504_Plan armare stalp S2",
  ]);
  // Selected Plan State
  const [selectedPlan, setSelectedPlan] = useState(planList[0]);
  // File State
  const [file, setFile] = useState("");
  // Update plan list
  function handleSetPlanList(plan) {
    setPlanList(plan);
  }

  // Set selected plan
  function handleSelectedPlan(plan) {
    setSelectedPlan(plan);
  }
  const handleResizeStart = (e) => {
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

  // File state
  function onFileChange(event) {
    const { files } = event.target;
    const nextFile = files?.[0];

    if (nextFile) {
      const fileName = nextFile.name.endsWith(".pdf")
        ? nextFile.name.slice(0, -4)
        : nextFile.name;

      const fileURL = URL.createObjectURL(nextFile);

      setFile({
        url: fileURL,
        name: fileName,
        size: nextFile.size,
        type: nextFile.type,
      });

      setSelectedPlan(fileName);
      handleSetPlanList((prev) => {
        if (!prev.includes(fileName)) {
          return [...prev, fileName];
        }
        return prev;
      });
    }
  }

  // Add cleanup for object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      // Clean up any object URLs when component unmounts
      if (file && file.url && file.url.startsWith("blob:")) {
        URL.revokeObjectURL(file.url);
      }
    };
  }, []);

  return planList.length > 0 ? (
    <AppContextProvider
      planList={planList}
      handleSetPlanList={handleSetPlanList}
      file={file}
      selectedPlan={selectedPlan}
      handleSelectedPlan={handleSelectedPlan}
      onFileChange={onFileChange}
    >
      <div className="container-fluid p-0">
        <PdfViewerContainer sidebarWidth={sidebarWidth} />
        <ResizeHandle
          forwardedRef={resizeHandleRef}
          width={sidebarWidth}
          isResizing={isResizing}
          onPointerDown={handleResizeStart}
        />
        <SidebarContainer width={sidebarWidth} />
      </div>
    </AppContextProvider>
  ) : (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow" style={{ minWidth: 400, maxWidth: 500 }}>
        <div className="card-body">
          <AddPdfTabContent onFileChange={onFileChange} />
        </div>
      </div>
    </div>
  );
}

export default App;

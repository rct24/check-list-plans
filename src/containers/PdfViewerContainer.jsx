import PdfViewer from "../components/PdfViewer";
import usePdfViewerLogic from "../hooks/usePdfViewerLogic";

export default function PdfViewerContainer({ sidebarWidth }) {
  const logic = usePdfViewerLogic();

  return (
    <PdfViewer
      sidebarWidth={sidebarWidth}
      containerRef={logic.containerRef}
      handleCanvasOnClick={logic.handleCanvasOnClick}
      handleMouseMove={logic.handleMouseMove}
      handleMouseLeave={logic.handleMouseLeave}
    />
  );
}

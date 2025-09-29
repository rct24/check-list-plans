import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function PdfViewer({
  sidebarWidth,
  containerRef,
  fileName,
  handleCanvasOnClick,
  handleMouseMove,
  handleMouseLeave,
}) {
  const { isDraw, canvasRef } = useContext(AppContext);
  //Render
  return (
    <div
      ref={containerRef}
      className="position-fixed h-100 p-3"
      style={{
        width: `calc(100% - ${sidebarWidth}px)`,
        top: 0,
        left: 0,
        transition: "width 0.1s ease",
      }}
    >
      <div className="position-relative w-100 h-100">
        <iframe
          src={`${import.meta.env.BASE_URL}${fileName}`}
          title="PDF Viewer"
          className="w-100 h-100 border-0 position-absolute top-0 start-0"
          style={{
            right: 0,
            bottom: 0,
            zIndex: 1,
            pointerEvents: isDraw ? "none" : "auto",
          }}
        />
        <canvas
          ref={canvasRef}
          onMouseDown={handleCanvasOnClick}
          onContextMenu={(e) => e.preventDefault()}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="position-absolute start-0 w-100"
          style={{
            top: "56px",
            height: "calc(100% - 56px)",
            right: 0,
            pointerEvents: isDraw ? "auto" : "none",
            background: "transparent",
            zIndex: 2,
            cursor: isDraw
              ? 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="%2328a745" stroke="white" stroke-width="2"/></svg>\') 12 12, auto'
              : "default",
          }}
        />
      </div>
    </div>
  );
}

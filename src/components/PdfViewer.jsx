import { useState, useRef, useEffect } from "react";

function drawGreenCheckMark(ctx, x, y, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#28a745";
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#28a745";
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = radius * 0.25;
  ctx.moveTo(x - radius * 0.4, y);
  ctx.lineTo(x - radius * 0.1, y + radius * 0.3);
  ctx.lineTo(x + radius * 0.5, y - radius * 0.3);
  ctx.stroke();
  ctx.restore();
}

export default function PdfViewer({ selectedPlan, isDraw, canvasRef }) {
  const fileName = `${selectedPlan}.pdf`;

  const containerRef = useRef(null);

  useEffect(() => {
    function updateCanvasSize() {
      if (!containerRef.current || !canvasRef.current) return;

      const container = containerRef.current;
      const canvas = canvasRef.current;
      const rect = container.getBoundingClientRect();

      canvas.width = rect.width;
      canvas.height = rect.height;
    }

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  function handleCanvasOnClick(e) {
    if (!isDraw) return;

    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      drawGreenCheckMark(ctx, x, y, 10);
    }
  }

  return (
    <div
      ref={containerRef}
      className="col-10 p-3 vh-100"
      style={{ position: "relative" }}
    >
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <iframe
          src={`${import.meta.env.BASE_URL}${fileName}`}
          title="PDF Viewer"
          className="w-100 h-100 border-0"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            pointerEvents: isDraw ? "none" : "auto",
          }}
        />
        <canvas
          ref={canvasRef}
          onClick={handleCanvasOnClick}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
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

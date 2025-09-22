import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";

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

function drawText(ctx, x, y, text) {
  ctx.save();
  ctx.font = "20px Arial";
  // Add white shadow/stroke
  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.strokeText(text, x + 20, y);
  // Draw the green text on top
  ctx.fillStyle = "#015e17ff";
  ctx.fillText(text, x + 20, y);
  ctx.restore();
}

export default function PdfViewer({ sidebarWidth }) {
  const { selectedPlan, isDraw, canvasRef, allItems, handleCheckBox } =
    useContext(AppContext);
  const [clicks, setClicks] = useState([]);

  const [hoverText, setHoverText] = useState(null);
  function handleSetHoverText(value) {
    setHoverText(value);
  }

  const [index, setIndex] = useState(0);
  function handleSetIndex() {
    setIndex((prev) => prev + 1);
  }

  const fileName = `${selectedPlan}.pdf`;
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    clicks.forEach((click) => {
      drawGreenCheckMark(ctx, click.x, click.y, 10);
      //drawText(ctx, click.x, click.y, click.text);
    });

    if (hoverText && isDraw) {
      drawText(ctx, hoverText.x, hoverText.y, hoverText.text);
    }
  }, [clicks, hoverText, isDraw]);

  useEffect(() => {
    function updateCanvasSize() {
      if (!containerRef.current || !canvasRef.current) return;
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height - 56; // Subtract 56px from height

      // Adjust for the canvas's position if needed
      const topOffset = 56;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clicks.forEach((click) => {
        const adjustedY = click.y - topOffset;
        if (adjustedY >= 0) {
          drawGreenCheckMark(ctx, click.x, adjustedY, 10);
          drawText(ctx, click.x, adjustedY, click.text);
        }
      });
    }

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  function handleCanvasOnClick(e) {
    if (!isDraw || !allItems || allItems.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (index < allItems.length) {
      const currentItem = allItems[index];
      const text = `${currentItem.section} - ${currentItem.text}`;
      setClicks((prevClicks) => [...prevClicks, { x, y, text }]);
      handleSetIndex(index);
      handleCheckBox(currentItem.section, currentItem.text);
    }
  }

  function handleMouseMove(e) {
    if (!isDraw || !allItems || allItems.length === 0) {
      handleSetHoverText(null);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (index < allItems.length) {
      const currentItem = allItems[index];
      const text = `${currentItem.section} - ${currentItem.text}`;

      handleSetHoverText({ x, y, text });
    }
  }

  function handleMouseLeave() {
    handleSetHoverText(null);
  }

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
          onClick={handleCanvasOnClick}
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

import PdfViewer from "../components/PdfViewer";
import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import {
  drawGreenCheckMark,
  drawRedXMark,
  drawText,
} from "../utils/pdfDrawings";

/**
 * PdfViewerContainer manages the PDF viewer and annotation overlay.
 *
 * - Imports PdfViewer and React hooks.
 * - Uses AppContext for shared state (selected plan, draw mode, canvas ref, checklist data, checkbox handler).
 * - Maintains per-plan annotation clicks and hover text state.
 * - Provides drawing utilities for checkmarks, X marks, and text on canvas.
 * - Handles:
 *    - Drawing annotations and hover text on canvas.
 *    - Canvas resizing and redrawing on window resize.
 *    - Filtering out annotations for removed checklist items.
 *    - Mouse events for drawing and hover preview.
 *    - Clearing annotations for the current plan.
 * - Renders PdfViewer, passing refs and event handlers.
 */

export default function PdfViewerContainer({ sidebarWidth }) {
  // Context
  const { selectedPlan, isDraw, canvasRef, checkListData, handleCheckBox } =
    useContext(AppContext);

  // useStates
  const [clicks, setClicks] = useState([]);
  const [hoverText, setHoverText] = useState(null);

  // useRef
  const clicksByPlanRef = useRef({});
  const containerRef = useRef(null);

  // variables
  const fileName = `${selectedPlan}.pdf`;
  const { items: checkList = [], firstUncheckedIndex: index = -1 } =
    checkListData || {};

  // useEffects
  // Load clicks for the selected plan
  useEffect(() => {
    if (clicksByPlanRef.current[selectedPlan] === undefined) {
      clicksByPlanRef.current[selectedPlan] = [];
    }
    setClicks(clicksByPlanRef.current[selectedPlan] || []);
  }, [selectedPlan]);

  // Save clicks to the ref object whenever they change
  useEffect(() => {
    clicksByPlanRef.current[selectedPlan] = clicks;
  }, [clicks, selectedPlan]);

  // Draw clicks and hover text
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    clicks.forEach((click) => {
      if (click.type === "check") {
        drawGreenCheckMark(ctx, click.x, click.y, 10);
        drawText(ctx, click.x, click.y, click.text, "check");
      } else if (click.type === "x-mark") {
        drawRedXMark(ctx, click.x, click.y, 10);
        drawText(ctx, click.x, click.y, click.text, "x-mark");
      }
    });

    if (hoverText && isDraw) {
      drawText(ctx, hoverText.x, hoverText.y, hoverText.text);
    }
  }, [clicks, hoverText, isDraw]);

  // Adjust canvas size and redraw on window resize
  useEffect(() => {
    function updateCanvasSize() {
      if (!containerRef.current || !canvasRef.current) return;
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;

      const topOffset = 56;
      canvas.height = rect.height - topOffset;

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      clicks.forEach((click) => {
        const adjustedY = click.y - topOffset;
        if (adjustedY >= 0) {
          if (click.type === "check") {
            drawGreenCheckMark(ctx, click.x, adjustedY, 10);
            drawText(ctx, click.x, adjustedY, click.text);
          } else if (click.type === "x-mark") {
            drawRedXMark(ctx, click.x, adjustedY, 10);
            drawText(ctx, click.x, adjustedY, click.text);
          }
        }
      });
    }

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, []);

  // Clean up clicks that no longer correspond to any checklist item
  useEffect(() => {
    if (!checkListData) return;

    const validTexts = new Set(
      (checkList || []).map((item) => `${item.sectionName} - ${item.item.text}`)
    );

    setClicks((prevClicks) =>
      prevClicks.filter((click) => validTexts.has(click.text))
    );
  }, [checkListData, selectedPlan]);

  // Handlers
  //
  function handleSetHoverText(value) {
    setHoverText(value);
  }

  //to be continued...
  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Clear only current plan's clicks
    setClicks([]);
    clicksByPlanRef.current[selectedPlan] = [];
  }

  // Expose clearCanvas function to context or parent if needed
  function handleCanvasOnClick(e) {
    if (!isDraw || !checkList.length || index === -1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (e.button === 2) {
      e.preventDefault();
    }

    if (index < checkList.length) {
      const currentItem = checkList[index];

      const text = `${currentItem.sectionName} - ${currentItem.item.text}`;

      if (e.button === 0) {
        // Left click - green checkmark
        setClicks((prevClicks) => [
          ...prevClicks,
          { x, y, text, type: "check" },
        ]);
        handleCheckBox(
          currentItem.sectionName,
          currentItem.item.text,
          true,
          "check"
        );
      }

      if (e.button === 2) {
        // Right click - red X mark
        setClicks((prevClicks) => [
          ...prevClicks,
          { x, y, text, type: "x-mark" },
        ]);
        handleCheckBox(
          currentItem.sectionName,
          currentItem.item.text,
          true,
          "x-mark"
        );
      }
    }
  }

  // Show hover text near cursor when in draw mode and there is an unchecked item
  function handleMouseMove(e) {
    if (!isDraw || !checkList.length || index === -1) {
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

    if (index < checkList.length) {
      const currentItem = checkList[index];

      const text = `${currentItem.sectionName} - ${currentItem.item.text}`;

      handleSetHoverText({ x, y, text });
    }
  }

  // Clear hover text when mouse leaves canvas
  function handleMouseLeave() {
    handleSetHoverText(null);
  }

  // Render
  return (
    <PdfViewer
      sidebarWidth={sidebarWidth}
      containerRef={containerRef}
      fileName={fileName}
      handleCanvasOnClick={handleCanvasOnClick}
      handleMouseMove={handleMouseMove}
      handleMouseLeave={handleMouseLeave}
    />
  );
}

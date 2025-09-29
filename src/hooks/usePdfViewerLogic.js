import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import {
  drawGreenCheckMark,
  drawRedXMark,
  drawText,
} from "../utils/pdfDrawings";

// Custom hook for PDF viewer logic
export default function usePdfViewerLogic() {
  // --- CONTEXT & SHARED STATE ---
  const { selectedPlan, isDraw, canvasRef, checkListData, handleCheckBox } =
    useContext(AppContext);

  // --- INTERNAL STATE ---
  const [clicks, setClicks] = useState([]); // Stores annotation clicks for current plan
  const [hoverText, setHoverText] = useState(null); // Stores hover text for preview

  // --- REFS ---
  const clicksByPlanRef = useRef({}); // Stores annotations for all plans
  const containerRef = useRef(null); // Ref for the main viewer container

  // --- DERIVED VARIABLES ---
  const fileName = `${selectedPlan}.pdf`;
  const { items: checkList = [], firstUncheckedIndex: index = -1 } =
    checkListData || {};

  // --- EFFECT: Load clicks for the selected plan ---
  useEffect(() => {
    // Initialize array if plan is new
    if (clicksByPlanRef.current[selectedPlan] === undefined) {
      clicksByPlanRef.current[selectedPlan] = [];
    }
    // Set local state to the saved array for the current plan
    setClicks(clicksByPlanRef.current[selectedPlan] || []);
  }, [selectedPlan]);

  // --- EFFECT: Save clicks to ref when they change ---
  useEffect(() => {
    clicksByPlanRef.current[selectedPlan] = clicks;
  }, [clicks, selectedPlan]);

  // --- REDRAW CANVAS WHENEVER CLICKS OR HOVER CHANGE ---
  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all clicks (annotations)
    clicks.forEach((click) => {
      if (click.type === "check") {
        drawGreenCheckMark(ctx, click.x, click.y, 10);
        // drawText(ctx, click.x, click.y, click.text, "check");
      } else if (click.type === "x-mark") {
        drawRedXMark(ctx, click.x, click.y, 10);
        drawText(ctx, click.x, click.y, click.text, "x-mark");
      }
    });

    // Draw hover preview if drawing mode is enabled
    if (hoverText && isDraw) {
      drawText(ctx, hoverText.x, hoverText.y, hoverText.text);
    }
  }, [clicks, hoverText, isDraw]);

  // --- EFFECT: Redraw canvas on relevant state changes ---
  useEffect(() => {
    redrawCanvas();
  }, [clicks, hoverText, isDraw, redrawCanvas]);

  // --- EFFECT: Update canvas size on resize ---
  useEffect(() => {
    function updateCanvasSize() {
      if (!containerRef.current || !canvasRef.current) return;
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;

      const topOffset = 56; // Adjust for header or toolbar
      canvas.height = rect.height - topOffset;

      redrawCanvas();
    }

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [redrawCanvas]);

  // --- EFFECT: Clean up clicks for deleted checklist items ---
  useEffect(() => {
    if (!checkListData) return;

    // Only keep clicks that match current checklist items
    const validTexts = new Set(
      (checkList || []).map((item) => `${item.sectionName} - ${item.item.text}`)
    );

    setClicks((prevClicks) =>
      prevClicks.filter((click) => validTexts.has(click.text))
    );
  }, [checkListData, selectedPlan]);

  // --- HANDLERS ---

  // Handle click on canvas to add annotation
  const handleCanvasOnClick = (e) => {
    if (!isDraw || !checkList.length || index === -1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Calculate click coordinates relative to canvas
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (e.button === 2) e.preventDefault(); // Prevent context menu on right click

    if (index < checkList.length) {
      const currentItem = checkList[index];
      const text = `${currentItem.sectionName} - ${currentItem.item.text}`;
      const type = e.button === 0 ? "check" : e.button === 2 ? "x-mark" : null;

      if (type) {
        setClicks((prevClicks) => [...prevClicks, { x, y, text, type }]);
        handleCheckBox(
          currentItem.sectionName,
          currentItem.item.text,
          true,
          type
        );
      }
    }
  };

  // Handle mouse move for hover preview
  const handleMouseMove = (e) => {
    if (!isDraw || !checkList.length || index === -1) {
      setHoverText(null);
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
      setHoverText({ x, y, text });
    }
  };

  // Handle mouse leaving canvas (remove hover preview)
  const handleMouseLeave = () => {
    setHoverText(null);
  };

  // Clear all annotations for current plan
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setClicks([]); // Clear state
    clicksByPlanRef.current[selectedPlan] = []; // Clear ref
  };

  return {
    containerRef,
    fileName,
    handleCanvasOnClick,
    handleMouseMove,
    handleMouseLeave,
    clearCanvas,
  };
}

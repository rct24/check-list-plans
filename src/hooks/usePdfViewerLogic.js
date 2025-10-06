import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { AppContext } from "../context/AppContext";
import {
  drawGreenCheckMark,
  drawRedXMark,
  drawText,
} from "../utils/pdfDrawings";

export default function usePdfViewerLogic() {
  const { selectedPlan, isDraw, canvasRef, checkListData, handleCheckBox } =
    useContext(AppContext);

  const [clicks, setClicks] = useState([]);
  const [hoverText, setHoverText] = useState(null);

  const clicksByPlanRef = useRef({});
  const containerRef = useRef(null);

  const fileName = `${selectedPlan}.pdf`;
  const { items: checkList = [], firstUncheckedIndex: index = -1 } =
    checkListData || {};

  useEffect(() => {
    if (clicksByPlanRef.current[selectedPlan] === undefined) {
      clicksByPlanRef.current[selectedPlan] = [];
    }
    setClicks(clicksByPlanRef.current[selectedPlan] || []);
  }, [selectedPlan]);

  useEffect(() => {
    clicksByPlanRef.current[selectedPlan] = clicks;
  }, [clicks, selectedPlan]);

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    clicks.forEach((click) => {
      if (click.type === "check") {
        drawGreenCheckMark(ctx, click.x, click.y, 10);
      } else if (click.type === "x-mark") {
        drawRedXMark(ctx, click.x, click.y, 10);
        drawText(ctx, click.x, click.y, click.text, "x-mark");
      }
    });

    if (hoverText && isDraw) {
      drawText(ctx, hoverText.x, hoverText.y, hoverText.text);
    }
  }, [clicks, hoverText, isDraw]);

  useEffect(() => {
    redrawCanvas();
  }, [clicks, hoverText, isDraw, redrawCanvas]);

  useEffect(() => {
    function updateCanvasSize() {
      if (!containerRef.current || !canvasRef.current) return;
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;

      const topOffset = 56;
      canvas.height = rect.height - topOffset;

      redrawCanvas();
    }

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [redrawCanvas]);

  useEffect(() => {
    if (!checkListData) return;

    const validTexts = new Set(
      (checkList || []).map((item) => `${item.sectionName} - ${item.item.text}`)
    );

    setClicks((prevClicks) =>
      prevClicks.filter((click) => validTexts.has(click.text))
    );
  }, [checkListData, selectedPlan]);

  const handleCanvasOnClick = (e) => {
    if (!isDraw || !checkList.length || index === -1) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    if (e.button === 2) e.preventDefault();

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

  const handleMouseLeave = () => {
    setHoverText(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setClicks([]);
    clicksByPlanRef.current[selectedPlan] = [];
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

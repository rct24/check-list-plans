import PdfViewer from "../components/PdfViewer";
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

function drawRedXMark(ctx, x, y, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#dc3545";
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#dc3545";
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = radius * 0.25;
  ctx.moveTo(x - radius * 0.4, y - radius * 0.4);
  ctx.lineTo(x + radius * 0.4, y + radius * 0.4);
  ctx.moveTo(x + radius * 0.4, y - radius * 0.4);
  ctx.lineTo(x - radius * 0.4, y + radius * 0.4);

  ctx.stroke();
  ctx.restore();
}

function drawText(ctx, x, y, text, type = "check") {
  ctx.save();
  ctx.font = "20px Arial";

  ctx.strokeStyle = "white";
  ctx.lineWidth = 3;
  ctx.strokeText(text, x + 20, y);

  if (type === "x-mark") {
    ctx.fillStyle = "#dc3545";
  } else {
    ctx.fillStyle = "#015e17ff";
  }

  ctx.fillText(text, x + 20, y);
  ctx.restore();
}

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
  useEffect(() => {
    if (clicksByPlanRef.current[selectedPlan] === undefined) {
      clicksByPlanRef.current[selectedPlan] = [];
    }
    setClicks(clicksByPlanRef.current[selectedPlan] || []);

    {
      /*if (indexByPlanRef.current[selectedPlan] === undefined) {
      indexByPlanRef.current[selectedPlan] = 0;
    }
    setIndex(indexByPlanRef.current[selectedPlan]);*/
    }
  }, [selectedPlan]);

  useEffect(() => {
    clicksByPlanRef.current[selectedPlan] = clicks;
  }, [clicks, selectedPlan]);

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

  // Handlers
  function handleSetHoverText(value) {
    setHoverText(value);
  }

  // function handleSetIndex() {
  //   const newIndex = index + 1;
  //   setIndex(newIndex);
  //   indexByPlanRef.current[selectedPlan] = newIndex;
  // }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Clear only current plan's clicks
    setClicks([]);
    clicksByPlanRef.current[selectedPlan] = [];
  }

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

  function handleMouseLeave() {
    handleSetHoverText(null);
  }

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

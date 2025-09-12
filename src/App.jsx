import PdfViewer from "./components/PdfViewer";
import SidebarContainer from "./containers/SidebarContainer";
import { useState, useRef } from "react";

function App() {
  const [planList, setPlanList] = useState([
    "R201_Plan fundatii",
    "R501_Plan cofraj stalp S1",
    "R502_Plan armare stalp S1",
    "R601_Plan cofraj grinda GA1",
    "R602_Plan armare grinda GA1",
  ]);
  const [selectedPlan, setSelectedPlan] = useState(planList[0]);
  const [isDraw, setIsDraw] = useState(false);
  const canvasRef = useRef(null);

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  return (
    <div className="container-fluid">
      <PdfViewer
        selectedPlan={selectedPlan}
        isDraw={isDraw}
        canvasRef={canvasRef}
      />
      <SidebarContainer
        planList={planList}
        selectedPlan={selectedPlan}
        setSelectedPlan={setSelectedPlan}
        isDraw={isDraw}
        setIsDraw={setIsDraw}
        clearCanvas={clearCanvas}
        canvasRef={canvasRef}
      />
    </div>
  );
}

export default App;

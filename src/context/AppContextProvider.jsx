import { AppContext } from "./AppContext";
import { useState, useRef } from "react";

export function AppContextProvider({ children }) {
  const [planList, setPlanList] = useState([
    "R501_Plan cofraj stalp S1_editat",
  ]);
  const [selectedPlan, setSelectedPlan] = useState(planList[0]);
  const [isDraw, setIsDraw] = useState(false);
  const canvasRef = useRef(null);

  function handleSelectedPlan(plan) {
    setSelectedPlan(plan);
  }

  function handleSetIsDraw(value) {
    setIsDraw(value);
  }
  function handleSetPlanList(plan) {
    setPlanList(plan);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  const value = {
    isDraw,
    planList,
    handleSetPlanList,
    selectedPlan,
    handleSelectedPlan,
    handleSetIsDraw,
    canvasRef,
    clearCanvas,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

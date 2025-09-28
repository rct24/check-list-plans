import { AppContext } from "./AppContext";
import { useState, useRef, useEffect, useMemo } from "react";
import { cofrajPana, armarePana, cofrajStalp } from "../constants/constants";

export function AppContextProvider({ children }) {
  const [planList, setPlanList] = useState([
    "R501_Plan cofraj stalp S1",
    "R502_Plan armare stalp S1",
    "R503_Plan cofraj stalp S2",
    "R504_Plan armare stalp S2",
  ]);
  const [selectedPlan, setSelectedPlan] = useState(planList[0]);
  const [isDraw, setIsDraw] = useState(false);
  const canvasRef = useRef(null);
  const allItemsRef = useRef([]);

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

  const [plansData, setPlansData] = useState(() => {
    const data = {};

    const defaultSections = [
      "Elevatie",
      "Sectiuni",
      "Piese inglobate",
      "Note",
      "Cartus",
    ];

    planList.forEach((plan) => {
      if (plan.toLowerCase().includes("cofraj stalp")) {
        data[plan] = JSON.parse(JSON.stringify(cofrajStalp));
      } else if (plan.toLowerCase().includes("cofraj")) {
        data[plan] = JSON.parse(JSON.stringify(cofrajPana));
      } else if (plan.toLowerCase().includes("armare")) {
        data[plan] = JSON.parse(JSON.stringify(armarePana));
      } else {
        data[plan] = {};
        defaultSections.forEach((section) => {
          data[plan][section] = [];
        });
      }
    });
    return data;
  });

  function handleSetPlansData(prev) {
    setPlansData(prev);
  }

  function handleCheckBox(sectionName, text, isChecked, mark) {
    handleSetPlansData((prev) => {
      const sectionList = prev[selectedPlan][sectionName] || [];
      const newList = sectionList.map((item) =>
        item.text === text ? { ...item, checked: isChecked, mark } : item
      );
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          [sectionName]: newList,
        },
      };
    });
  }

  const checkListData = useMemo(() => {
    let items = [];
    let firstUncheckedIndex = -1;
    Object.entries(plansData[selectedPlan]).forEach(
      ([sectionName, itemsArray]) => {
        itemsArray.forEach((item, idx) => {
          items.push({
            id: `${idx}_${selectedPlan}_${sectionName}_${item.text}`,
            selectedPlan,
            sectionName,
            item,
            mark: item.mark,
          });
          if (firstUncheckedIndex === -1 && item.checked === false) {
            firstUncheckedIndex = items.length - 1;
          }
        });
      }
    );
    return { items, firstUncheckedIndex };
  }, [plansData, selectedPlan]);

  const value = {
    isDraw,
    planList,
    handleSetPlanList,
    selectedPlan,
    handleSelectedPlan,
    handleSetIsDraw,
    canvasRef,
    clearCanvas,
    checkListData,
    plansData,
    handleSetPlansData,
    handleCheckBox,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

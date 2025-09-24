import { AppContext } from "./AppContext";
import { useState, useRef } from "react";
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

  function handleCheckBox(sectionName, text, value) {
    handleSetPlansData((prev) => {
      const sectionList = prev[selectedPlan][sectionName] || [];
      const newList = sectionList.map((item) =>
        item.text === text ? { ...item, checked: value } : item
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

  {
    /* Object.entries(plansData).forEach(([plan, sectionsObj]) => {
      Object.entries(sectionsObj).forEach(([section, items]) => {
        items.forEach((item) => {
          allItems.push({ plan, section, ...item });
          });
          });
          });*/
  }

  let allItems = [];
  Object.entries(plansData[selectedPlan]).forEach(
    ([sectionName, sectionsObj]) => {
      Object.entries(sectionsObj).forEach(([_, item]) => {
        allItems.push({
          id: `${selectedPlan}_${sectionName}_${item.text}`,
          selectedPlan,
          sectionName,
          item,
        });
      });
    }
  );

  const value = {
    isDraw,
    planList,
    handleSetPlanList,
    selectedPlan,
    handleSelectedPlan,
    handleSetIsDraw,
    canvasRef,
    clearCanvas,
    allItems,
    plansData,
    handleSetPlansData,
    handleCheckBox,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

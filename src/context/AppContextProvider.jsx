import { AppContext } from "./AppContext";
import { useState, useRef, useEffect, useMemo } from "react";
import { cofrajPana, armarePana, cofrajStalp } from "../constants/constants";

// App Context Provider Component
export function AppContextProvider({
  children,
  planList,
  handleSetPlanList,
  file,
  selectedPlan,
  handleSelectedPlan,
  onFileChange,
}) {
  // Drawing State
  const [isDraw, setIsDraw] = useState(false);
  console.log(selectedPlan);

  const canvasRef = useRef(null);

  // Set isDraw
  function handleSetIsDraw(value) {
    setIsDraw(value);
  }

  // Clear canvas
  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Plans Data State
  const [plansData, setPlansData] = useState(() => {
    const data = {};

    const defaultSections = [
      "Elevatie",
      "Sectiuni",
      "Piese inglobate",
      "Note",
      "Cartus",
    ];

    // Initialize plansData with default sections for each plan
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

  // Handle checkbox toggle
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

  // Better solution using useMemo
  const checkListData = useMemo(() => {
    let items = [];
    let firstUncheckedIndex = -1;

    // Guard against undefined or null
    if (!selectedPlan || !plansData[selectedPlan]) {
      return { items, firstUncheckedIndex };
    }

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
    onFileChange,
    file,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

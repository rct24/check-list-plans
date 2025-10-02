import { AppContext } from "./AppContext";
import { useState, useRef, useEffect, useMemo } from "react";
import { cofrajPana, armarePana, cofrajStalp } from "../constants/constants";

function getInitialPlanData(plan) {
  const defaultSections = [
    "Elevatie",
    "Sectiuni",
    "Piese inglobate",
    "Note",
    "Cartus",
  ];
  if (plan.toLowerCase().includes("cofraj stalp")) {
    return JSON.parse(JSON.stringify(cofrajStalp));
  } else if (plan.toLowerCase().includes("cofraj")) {
    return JSON.parse(JSON.stringify(cofrajPana));
  } else if (plan.toLowerCase().includes("armare")) {
    return JSON.parse(JSON.stringify(armarePana));
  } else {
    const sectionObj = {};
    defaultSections.forEach((section) => {
      sectionObj[section] = [];
    });
    return sectionObj;
  }
}

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
    planList.forEach((plan) => {
      data[plan] = getInitialPlanData(plan);
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

  // Add a fileMap state to track file objects by name
  const [fileMap, setFileMap] = useState({});

  // Add to your existing onFileChange or create a new handler
  function handleFileChange(event) {
    const { files } = event.target;
    const nextFile = files?.[0];

    if (nextFile) {
      const fileName = nextFile.name.endsWith(".pdf")
        ? nextFile.name.slice(0, -4)
        : nextFile.name;

      const fileURL = URL.createObjectURL(nextFile);

      // Update fileMap with new file
      setFileMap((prev) => ({
        ...prev,
        [fileName]: {
          url: fileURL,
          name: fileName,
          size: nextFile.size,
          type: nextFile.type,
        },
      }));

      // Use the original onFileChange for plan list updates
      onFileChange(event);
    }
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
    checkListData,
    plansData,
    handleSetPlansData,
    handleCheckBox,
    onFileChange,
    file,
    fileMap,
  };

  useEffect(() => {
    if (planList.length === 0) return;
    setPlansData((prev) => {
      const updated = { ...prev };
      planList.forEach((plan) => {
        if (!updated[plan]) {
          updated[plan] = getInitialPlanData(plan);
        }
      });
      return updated;
    });
  }, [planList]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(fileMap).forEach((file) => {
        if (file.url && file.url.startsWith("blob:")) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

import { useState, useCallback } from "react";
import { AppContext, useAppContext } from "../context/AppContext";
import { SideBarContext } from "./SideBarContext";

export function SideBarContextProvider({ children }) {
  const { selectedPlan, plansData, handleSetPlansData } =
    useAppContext(AppContext);

  const [sectionInput, setSectionInput] = useState("");

  function handleSectionInput(value) {
    setSectionInput(value);
  }

  const handleAddSection = useCallback(() => {
    if (sectionInput.trim() === "") return;
    if (plansData[selectedPlan][sectionInput]) {
      alert("Section already exists!");
      return;
    }
    handleSetPlansData((prev) => ({
      ...prev,
      [selectedPlan]: {
        ...prev[selectedPlan],
        [sectionInput]: [],
      },
    }));
    setSectionInput("");
  }, [sectionInput, plansData, selectedPlan, handleSetPlansData]);

  const handleEditSection = useCallback(
    (sectionName, newSectionName) => {
      handleSetPlansData((prev) => {
        if (prev[selectedPlan][newSectionName]) {
          alert("Section name already exists!");
          return prev;
        }
        const sectionToDoList = prev[selectedPlan][sectionName] || [];
        const updatedSections = {};
        Object.entries(prev[selectedPlan]).forEach(([key, value]) => {
          updatedSections[key === sectionName ? newSectionName : key] = value;
        });
        return {
          ...prev,
          [selectedPlan]: updatedSections,
        };
      });
    },
    [plansData, selectedPlan, handleSetPlansData]
  );

  const handleDeleteSection = useCallback(
    (sectionName) => {
      handleSetPlansData((prev) => {
        const updatedSections = { ...prev[selectedPlan] };
        delete updatedSections[sectionName];
        return {
          ...prev,
          [selectedPlan]: updatedSections,
        };
      });
    },
    [selectedPlan, handleSetPlansData]
  );

  const handleAddItem = useCallback(
    (sectionName, itemText) => {
      handleSetPlansData((prev) => {
        const sectionList = prev[selectedPlan][sectionName] || [];
        // Generate a unique id for the new item
        const newId = Date.now() + Math.random();
        return {
          ...prev,
          [selectedPlan]: {
            ...prev[selectedPlan],
            [sectionName]: [
              ...sectionList,
              { id: newId, text: itemText, checked: false, mark: undefined },
            ],
          },
        };
      });
    },
    [plansData, selectedPlan, handleSetPlansData]
  );

  const handleDeleteItem = useCallback(
    (sectionName, index) => {
      handleSetPlansData((prev) => {
        const sectionList = prev[selectedPlan][sectionName] || [];
        const newList = sectionList.filter((_, idx) => idx !== index);
        return {
          ...prev,
          [selectedPlan]: {
            ...prev[selectedPlan],
            [sectionName]: newList,
          },
        };
      });
    },
    [selectedPlan, handleSetPlansData]
  );

  const handleEditItem = useCallback(
    (sectionName, index, newTextValue) => {
      handleSetPlansData((prev) => {
        const sectionToDoList = prev[selectedPlan][sectionName] || [];

        const newList = sectionToDoList.map((item, i) =>
          i === index ? { ...item, text: newTextValue } : item
        );

        return {
          ...prev,
          [selectedPlan]: {
            ...prev[selectedPlan],
            [sectionName]: newList,
          },
        };
      });
    },
    [selectedPlan, handleSetPlansData]
  );

  const handleToggleItem = useCallback(
    (sectionName, index) => {
      handleSetPlansData((prev) => {
        const sectionList = prev[selectedPlan][sectionName] || [];
        return {
          ...prev,
          [selectedPlan]: {
            ...prev[selectedPlan],
            [sectionName]: sectionList.map((item, idx) =>
              idx === index
                ? {
                    ...item,
                    checked: !item.checked,
                    mark: !item.checked ? "check" : "",
                  }
                : item
            ),
          },
        };
      });
    },
    [plansData, selectedPlan]
  );

  const sections =
    plansData && selectedPlan ? Object.keys(plansData[selectedPlan]) : null;

  const value = {
    plansData,
    sectionInput,
    handleSectionInput,
    handleAddSection,
    handleEditSection,
    handleDeleteSection,
    handleAddItem,
    handleDeleteItem,
    handleToggleItem,
    handleEditItem,
    sections,
  };

  return (
    <SideBarContext.Provider value={value}>{children}</SideBarContext.Provider>
  );
}

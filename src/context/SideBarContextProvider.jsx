import { useState } from "react";
import { AppContext, useAppContext } from "../context/AppContext";
import { SideBarContext } from "./SideBarContext";
import { useMemo } from "react";

// SideBar Context Provider Component
export function SideBarContextProvider({ children }) {
  const { selectedPlan, plansData, handleSetPlansData } =
    useAppContext(AppContext);

  const [sectionInput, setSectionInput] = useState("");

  //--Section handlers--
  function handleSectionInput(value) {
    setSectionInput(value);
  }
  // Add new section
  function handleAddSection() {
    if (sectionInput.trim() === "") return;
    if (!selectedPlan || !plansData[selectedPlan]) {
      console.warn("No plan selected or plan data not found");
      return;
    }

    if (plansData[selectedPlan][sectionInput]) {
      alert("Section already exists!");
      return;
    }

    handleSetPlansData((prev) => {
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          [sectionInput]: [],
        },
      };
    });
    handleSectionInput("");
  }
  // Edit section name
  function handleEditSection(sectionName, newSectionName) {
    if (!selectedPlan || !plansData[selectedPlan]) return;

    handleSetPlansData((prev) => {
      if (prev[selectedPlan][newSectionName]) {
        alert("Section name already exists!");
        return prev;
      }
      const sectionToDoList = prev[selectedPlan][sectionName] || [];
      const updatedSections = {};
      const entries = Object.entries(prev[selectedPlan]);
      for (let [key, value] of entries) {
        if (key === sectionName) {
          updatedSections[newSectionName] = sectionToDoList;
        } else {
          updatedSections[key] = value;
        }
      }
      return {
        ...prev,
        [selectedPlan]: updatedSections,
      };
    });
  }
  // Delete section
  function handleDeleteSection(sectionName) {
    if (!selectedPlan || !plansData[selectedPlan]) return;

    handleSetPlansData((prev) => {
      const updatedSections = { ...prev[selectedPlan] };
      delete updatedSections[sectionName];
      return {
        ...prev,
        [selectedPlan]: updatedSections,
      };
    });
  }

  //--Item handlers--
  // Add new item to section
  function handleAddItem(sectionName, itemText) {
    if (!selectedPlan || !plansData[selectedPlan]) return;

    handleSetPlansData((prev) => {
      const sectionList = prev[selectedPlan][sectionName] || [];
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          [sectionName]: [
            ...sectionList,
            { text: itemText, checked: false, mark: undefined },
          ],
        },
      };
    });
  }

  // Delete item from section
  function handleDeleteItem(sectionName, index) {
    if (!selectedPlan || !plansData[selectedPlan]) return;

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
  }

  // Edit item text
  function handleEditItem(sectionName, index, newTextValue) {
    if (!selectedPlan || !plansData[selectedPlan]) return;

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
  }

  // Toggle item checked state
  function handleToggleItem(sectionName, index) {
    if (!selectedPlan || !plansData[selectedPlan]) return;

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
  }

  const sections = useMemo(
    () =>
      selectedPlan && plansData[selectedPlan]
        ? Object.keys(plansData[selectedPlan])
        : [],
    [selectedPlan, plansData]
  );

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

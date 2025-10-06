import { useState } from "react";
import { AppContext, useAppContext } from "../context/AppContext";
import { SideBarContext } from "./SideBarContext";

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

  const sections =
    plansData && selectedPlan ? Object.keys(plansData[selectedPlan]) : null;

  // REVIEW: install React Developer Tools if not already, go to dev tools -> react components -> settings -> select highlight updates when components render and check to see how many get re-rendered when you do actions.
  // Run the React Profiler when checking a box.
  // Review useMemo, useCallback and Context docs and how they are used to prevent unecessary re-rendering in child components.
  // What gets re-rendered when you select a single ListItem? Should that happen? Re-renders should be isolated.
  // Why does only the ListItem get re-rendered if you edit it, but the whole sidebar re-renders if you check a box?
  // Similar for delete

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

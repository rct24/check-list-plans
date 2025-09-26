import { useState } from "react";
import { AppContext, useAppContext } from "../context/AppContext";
import { SideBarContext } from "./SideBarContext";

export function SideBarContextProvider({ children }) {
  const { selectedPlan, plansData, handleSetPlansData } =
    useAppContext(AppContext);

  const [sectionInput, setSectionInput] = useState("");

  //--Section handlers--
  function handleSectionInput(value) {
    setSectionInput(value);
  }

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
  function handleAddItem(sectionName, itemText) {
    handleSetPlansData((prev) => {
      const sectionList = prev[selectedPlan][sectionName] || [];
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          [sectionName]: [...sectionList, { text: itemText, checked: false }],
        },
      };
    });
  }

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

  const sections = Object.keys(plansData[selectedPlan]);

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

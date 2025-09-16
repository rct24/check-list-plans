import { useState } from "react";
import { cofrajPana, armarePana } from "../constants/constants";
import Sidebar from "../components/Sidebar";
import { AppContext, useAppContext } from "../context/AppContext";

export default function SidebarContainer() {
  const { planList, selectedPlan } = useAppContext(AppContext);

  const [plansData, setPlansData] = useState(() => {
    const defaultSections = [
      "Elevatie",
      "Sectiuni",
      "Piese inglobate",
      "Note",
      "Cartus",
    ];

    const data = {};

    planList.forEach((plan) => {
      if (plan.toLowerCase().includes("cofraj")) {
        data[plan] = JSON.parse(JSON.stringify(cofrajPana));
      } else if (plan.toLowerCase().includes("armare")) {
        data[plan] = JSON.parse(JSON.stringify(armarePana));
      } else if (plan.toLowerCase().includes("cofraj stalp")) {
        data[plan] = JSON.parse(JSON.stringify(cofrajStalp));
      } else {
        data[plan] = {};
        defaultSections.forEach((section) => {
          data[plan][section] = [];
        });
      }
    });
    return data;
  });

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

    setPlansData((prev) => {
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
    setPlansData((prev) => {
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
    setPlansData((prev) => {
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
    setPlansData((prev) => {
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
    setPlansData((prev) => {
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
    setPlansData((prev) => {
      const sectionToDoList = prev[selectedPlan][sectionName] || [];
      console.log({ plansData });

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
    setPlansData((prev) => {
      const sectionList = prev[selectedPlan][sectionName] || [];
      const newList = sectionList.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
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

  const sections = Object.keys(plansData[selectedPlan]);

  return (
    <Sidebar
      plansData={plansData}
      sectionInput={sectionInput}
      handleSectionInput={handleSectionInput}
      handleAddSection={handleAddSection}
      sections={sections}
      handleAddItem={handleAddItem}
      handleDeleteItem={handleDeleteItem}
      handleToggleItem={handleToggleItem}
      handleEditItem={handleEditItem}
      handleEditSection={handleEditSection}
      handleDeleteSection={handleDeleteSection}
    />
  );
}

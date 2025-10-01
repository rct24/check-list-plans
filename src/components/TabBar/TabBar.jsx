import { useState } from "react";
import { AppContext, useAppContext } from "../../context/AppContext";

import {
  SideBarContext,
  useSideBarContext,
} from "../../context/SideBarContext";
import TabNavItem from "./TabNavItem";
import DrawTabContent from "./DrawTabContent";
import AddSectionTabContent from "./AddSectionTabContent";
import AddPdfTabContent from "./AddPdfTabContent";

export default function TabBar() {
  const { isDraw, handleSetIsDraw, clearCanvas, onFileChange } =
    useAppContext(AppContext);
  const { sectionInput, handleSectionInput, handleAddSection } =
    useSideBarContext(SideBarContext);
  const [activeTab, setActiveTab] = useState("draw");

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const tabs = [
    { id: "draw", label: "Draw" },
    { id: "addSection", label: "Add Section" },
    { id: "addPdf", label: "Add pdf" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "draw":
        return (
          <DrawTabContent
            isDraw={isDraw}
            handleSetIsDraw={handleSetIsDraw}
            clearCanvas={clearCanvas}
          />
        );
      case "addSection":
        return (
          <AddSectionTabContent
            sectionInput={sectionInput}
            handleSectionInput={handleSectionInput}
            handleAddSection={handleAddSection}
          />
        );
      case "addPdf":
        return <AddPdfTabContent onFileChange={onFileChange} />;
      default:
        return null;
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      <ul className="nav nav-tabs nav-fill">
        {tabs.map((tab) => (
          <TabNavItem
            key={tab.id}
            id={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
          />
        ))}
      </ul>
      {renderTabContent()}
    </div>
  );
}

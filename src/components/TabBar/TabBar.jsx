import { useState } from "react";
<<<<<<< HEAD
import { AppContext, useAppContext } from "../../context/AppContext";

import {
  SideBarContext,
  useSideBarContext,
} from "../../context/SideBarContext";
=======
import { AppContext, useAppContext } from "../../shared/context/AppContext";
import {
  SideBarContext,
  useSideBarContext,
} from "../../shared/context/SideBarContext";
>>>>>>> 63ee775 (Refactor TabBar component; restructure tab content into separate components and update import paths for improved organization and maintainability.)
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

<<<<<<< HEAD
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

=======
>>>>>>> 63ee775 (Refactor TabBar component; restructure tab content into separate components and update import paths for improved organization and maintainability.)
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
<<<<<<< HEAD
            onClick={() => handleTabChange(tab.id)}
=======
            onClick={() => setActiveTab(tab.id)}
>>>>>>> 63ee775 (Refactor TabBar component; restructure tab content into separate components and update import paths for improved organization and maintainability.)
          />
        ))}
      </ul>
      {renderTabContent()}
    </div>
  );
}

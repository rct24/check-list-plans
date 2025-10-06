import { useRef } from "react";
import { AppContext, useAppContext } from "../context/AppContext";
import TabBar from "./TabBar/TabBar";
import CheckListContainer from "../containers/CheckListContainer";
import PlanSelector from "./PlanSelector";
import { SideBarContext, useSideBarContext } from "../context/SideBarContext";

export default function Sidebar({ width }) {
  const { planList, selectedPlan, handleSelectedPlan } =
    useAppContext(AppContext);
  const { plansData, sections, handleAddItem } =
    useSideBarContext(SideBarContext);
  const sidebarRef = useRef(null);

  return (
    <div
      ref={sidebarRef}
      className="position-fixed end-0 overflow-auto shadow-lg border-start"
      style={{
        width: `${width}px`,
        maxHeight: "100vh",
        top: "0",
        backgroundColor: "var(--bs-white)",
      }}
    >
      <TabBar />
      <PlanSelector
        planList={planList}
        selectedPlan={selectedPlan}
        onPlanChange={handleSelectedPlan}
      />
      {selectedPlan ? (
        sections.map((sectionName) => (
          <CheckListContainer
            key={sectionName}
            sectionName={sectionName}
            list={plansData[selectedPlan][sectionName]}
            handleAddItem={(text) => handleAddItem(sectionName, text)}
          />
        ))
      ) : (
        <div className="p-3 text-muted">
          Please select a plan to view its checklist.
        </div>
      )}
      <br />
      <button
        className="btn btn-secondary"
        onClick={() =>
          selectedPlan &&
          console.log(JSON.stringify(plansData[selectedPlan], null, 2))
        }
        disabled={!selectedPlan}
      >
        Print JSON to Console
      </button>
    </div>
  );
}

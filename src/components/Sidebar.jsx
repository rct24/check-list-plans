import { useState, useRef, useEffect } from "react";
import { AppContext, useAppContext } from "../context/AppContext";
import TabBar from "../components/TabBar";
import CheckListContainer from "../containers/CheckListContainer";
import { SideBarContext, useSideBarContext } from "../context/SideBarContext";
import ResizeHandle from "./ResizeHandle";

export default function Sidebar({ width }) {
  const { planList, selectedPlan, handleSelectedPlan } =
    useAppContext(AppContext);
  const { plansData, sections, handleAddItem } = useSideBarContext();
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
      <div className="form-floating">
        <select
          className="form-select"
          id="plan-selection"
          name="plans"
          value={selectedPlan}
          onChange={(e) => handleSelectedPlan(e.target.value)}
        >
          {planList.map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>
        <label className="form-check-label" htmlFor="plan-selection">
          Plan selection:
        </label>
      </div>
      <br />
      {sections.map((sectionName) => (
        <CheckListContainer
          key={sectionName}
          sectionName={sectionName}
          list={plansData[selectedPlan][sectionName]}
          handleAddItem={(text) => handleAddItem(sectionName, text)}
        />
      ))}
      <br />
      <button
        className="btn btn-secondary"
        onClick={() =>
          console.log(JSON.stringify(plansData[selectedPlan], null, 2))
        }
      >
        Print JSON to Console
      </button>
    </div>
  );
}

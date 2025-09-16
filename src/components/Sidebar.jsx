import { AppContext, useAppContext } from "../context/AppContext";
import TabBar from "../components/TabBar";
import CheckListContainer from "../containers/CheckListContainer";
export default function Sidebar({
  plansData,
  sectionInput,
  handleAddSection,
  sections,
  handleAddItem,
  handleDeleteItem,
  handleToggleItem,
  handleEditItem,
  handleEditSection,
  handleDeleteSection,
  handleSectionInput,
}) {
  const { planList, selectedPlan, handleSelectedPlan } =
    useAppContext(AppContext);

  return (
    <div
      className="col-2 position-fixed end-0 overflow-auto card shadow-sm p-3"
      style={{ maxHeight: "100vh", top: "0" }}
    >
      <TabBar
        sectionInput={sectionInput}
        handleAddSection={handleAddSection}
        handleSectionInput={handleSectionInput}
      />
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
          handleDeleteItem={handleDeleteItem}
          handleToggleItem={handleToggleItem}
          handleEditItem={handleEditItem}
          handleEditSection={handleEditSection}
          handleDeleteSection={handleDeleteSection}
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

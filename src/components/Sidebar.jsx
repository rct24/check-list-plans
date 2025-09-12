import CheckListContainer from "../containers/CheckListContainer";
import TabBar from "./TabBar";
export default function Sidebar({
  planList,
  plansData,
  selectedPlan,
  setSelectedPlan,
  sectionInput,
  setSectionInput,
  handleAddSection,
  sections,
  handleAddItem,
  handleDeleteItem,
  handleToggleItem,
  handleEditItem,
  handleEditSection,
  handleDeleteSection,
  clearCanvas,
  isDraw,
  setIsDraw,
}) {
  return (
    <div
      className="col-2 position-fixed end-0 overflow-auto card shadow-sm p-3"
      style={{ maxHeight: "100vh", top: "0" }}
    >
      <TabBar
        sectionInput={sectionInput}
        setSectionInput={setSectionInput}
        handleAddSection={handleAddSection}
        clearCanvas={() => {
          clearCanvas();
        }}
        isDraw={isDraw}
        setIsDraw={setIsDraw}
      />
      <div className="form-floating">
        <select
          className="form-select"
          id="plan-selection"
          name="plans"
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
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

import CheckListContainer from "../containers/CheckListContainer";

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
}) {
  return (
    <div
      className="position-fixed end-0 top-0 h-100 overflow-auto "
      style={{
        width: "20vw",
        maxWidth: "400px",
        minWidth: "250px",
        zIndex: 1040,
      }}
    >
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
      <div className="card mb-3">
        <div className="card-header">
          <h5 className="card-title mb-0">Add New Section</h5>
        </div>
        <div className="card-body">
          <div className="form-floating mb-3">
            <input
              className="form-control"
              id="add-section-input"
              type="text"
              name="addSection"
              placeholder="Add new section"
              value={sectionInput}
              onChange={(e) => setSectionInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddSection();
                }
              }}
            />
            <label htmlFor="floatingSectionInput">Add Section Name</label>
          </div>
          <button
            className="btn btn-primary w-100"
            type="submit"
            onClick={handleAddSection}
          >
            Add Section
          </button>
        </div>
      </div>
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

export default function AddSectionTabContent({
  sectionInput,
  handleSectionInput,
  handleAddSection,
}) {
  return (
    <div className="card-body">
      <div className="input-group mb-3">
        <div className="form-floating flex-grow-1">
          <input
            className="form-control"
            id="add-section-input"
            type="text"
            name="addSection"
            placeholder="Add new section"
            value={sectionInput}
            onChange={(e) => handleSectionInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddSection();
              }
            }}
          />
          <label htmlFor="add-section-input">Add Section Name</label>
        </div>
        <button
          className="btn btn-primary"
          type="button"
          id="add-section-submit"
          name="add-section-submit"
          onClick={handleAddSection}
        >
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
    </div>
  );
}

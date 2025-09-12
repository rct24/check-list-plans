import { useState } from "react";

export default function TabBar({
  sectionInput,
  setSectionInput,
  handleAddSection,
  clearCanvas,
  isDraw,
  setIsDraw,
}) {
  const [activeTab, setActiveTab] = useState("draw");

  return (
    <div className="card mb-3">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "draw" ? "active" : ""}`}
            onClick={() => setActiveTab("draw")}
            style={{ cursor: "pointer" }}
          >
            Draw
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "add" ? "active" : ""}`}
            aria-current={activeTab === "add" ? "page" : undefined}
            onClick={() => setActiveTab("add")}
            style={{ cursor: "pointer" }}
          >
            Add Section
          </button>
        </li>
      </ul>

      {activeTab === "add" && (
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
            <label htmlFor="add-section-input">Add Section Name</label>
          </div>
          <button
            className="btn btn-primary w-100"
            type="button"
            onClick={handleAddSection}
          >
            Add Section
          </button>
        </div>
      )}

      {activeTab === "draw" && (
        <div className="card-body">
          {isDraw ? (
            <button
              className="btn btn-danger me-2"
              type="button"
              onClick={() => setIsDraw(false)}
            >
              Stop
            </button>
          ) : (
            <button
              className="btn btn-success me-2"
              type="button"
              onClick={() => setIsDraw(true)}
            >
              Start
            </button>
          )}
          <button
            className="btn btn-secondary"
            type="button"
            onClick={clearCanvas}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

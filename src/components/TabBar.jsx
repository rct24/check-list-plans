import { useState, useId } from "react";
import { AppContext, useAppContext } from "../context/AppContext";
import { SideBarContext, useSideBarContext } from "../context/SideBarContext";

export default function TabBar() {
  const { isDraw, handleSetIsDraw, clearCanvas, onFileChange } =
    useAppContext(AppContext);
  const { sectionInput, handleSectionInput, handleAddSection } =
    useSideBarContext(SideBarContext);
  const [activeTab, setActiveTab] = useState("draw");
  const fileId = useId();

  return (
    <div className="card mb-3 shadow-sm">
      <ul className="nav nav-tabs nav-fill">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "draw" ? "active" : ""}`}
            id="draw-tab"
            name="draw-tab"
            onClick={() => setActiveTab("draw")}
            style={{ cursor: "pointer" }}
            type="button"
          >
            Draw
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "add" ? "active" : ""}`}
            id="add-section-tab"
            name="add-section-tab"
            aria-current={activeTab === "add" ? "page" : undefined}
            onClick={() => setActiveTab("add")}
            style={{ cursor: "pointer" }}
            type="button"
          >
            Add Section
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "lorem" ? "active" : ""}`}
            id="lorem-tab"
            name="lorem-tab"
            aria-current={activeTab === "lorem" ? "page" : undefined}
            onClick={() => setActiveTab("lorem")}
            style={{ cursor: "pointer" }}
            type="button"
          >
            Add pdf
          </button>
        </li>
      </ul>

      {activeTab === "draw" && (
        <div className="card-body d-flex gap-2">
          {isDraw ? (
            <button
              className="btn btn-danger"
              type="button"
              id="draw-stop"
              name="draw-stop"
              onClick={() => handleSetIsDraw(false)}
            >
              Stop
            </button>
          ) : (
            <button
              className="btn btn-success"
              type="button"
              id="draw-start"
              name="draw-start"
              onClick={() => handleSetIsDraw(true)}
            >
              Start
            </button>
          )}
          <button
            className="btn btn-secondary"
            type="button"
            id="draw-clear"
            name="draw-clear"
            onClick={() => {
              handleSetIsDraw(false);
              clearCanvas();
            }}
          >
            Hide
          </button>
        </div>
      )}

      {activeTab === "add" && (
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
      )}

      {activeTab === "lorem" && (
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor={fileId} className="form-label">
              Load from file:
            </label>
            <input
              id={fileId}
              onChange={onFileChange}
              type="file"
              className="form-control"
            />
          </div>
        </div>
      )}
    </div>
  );
}

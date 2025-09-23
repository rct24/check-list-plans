import { useContext, useState } from "react";
import { AppContext, useAppContext } from "../context/AppContext";
import { SideBarContext, useSideBarContext } from "../context/SideBarContext";

export default function TabBar() {
  const { isDraw, handleSetIsDraw, clearCanvas } = useAppContext(AppContext);
  const { sectionInput, handleSectionInput, handleAddSection } =
    useSideBarContext(SideBarContext);
  const [activeTab, setActiveTab] = useState("draw");

  return (
    <div className="card mb-3">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "draw" ? "active" : ""}`}
            id="draw-tab"
            name="draw-tab"
            onClick={() => setActiveTab("draw")}
            style={{ cursor: "pointer" }}
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
          >
            Lorem ipsum
          </button>
        </li>
      </ul>

      {activeTab === "draw" && (
        <div className="card-body">
          {isDraw ? (
            <button
              className="btn btn-danger me-2"
              type="button"
              id="draw-stop"
              name="draw-stop"
              onClick={() => handleSetIsDraw(false)}
            >
              Stop
            </button>
          ) : (
            <button
              className="btn btn-success me-2"
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
          </p>
          <p>
            Magna nulla id sed nisl sagittis aliquet. Nam pulvinar turpis
            bibendum dui commodo, id hendrerit velit suscipit. Morbi id aliquet
            urna. Aliquam interdum.
          </p>
        </div>
      )}
    </div>
  );
}

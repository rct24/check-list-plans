import { SideBarContext, useSideBarContext } from "../context/SideBarContext";

export default function ListItem({
  itemObj,
  index,
  sectionName,
  isRowHover,
  isItemEdit,
  textValue,
  handleMouseEnter,
  handleMouseLeave,
  handleDoubleClick,
  handleEditKeyDown,
  handleEditSubmit,
  handleTextChange,
}) {
  const { handleToggleItem, handleDeleteItem } =
    useSideBarContext(SideBarContext);

  let spanClasses = ["d-block"];
  if (itemObj.checked && itemObj.mark === "check") {
    spanClasses.push(
      "text-decoration-line-through",
      "fst-italic",
      "opacity-50"
    );
  } else if (itemObj.checked && itemObj.mark === "x-mark") {
    spanClasses.push("text-danger", "opacity-75", "fw-bold");
  }

  return (
    <li
      className="list-group-item d-flex align-items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="form-check position-relative">
        <input
          className="form-check-input me-2"
          type="checkbox"
          id={`checkbox-${sectionName}-${index}`}
          name={`checkbox-${sectionName}-${index}`}
          checked={itemObj.checked && itemObj.mark === "check"}
          onChange={() => handleToggleItem(sectionName, index)}
          aria-label={`Mark ${itemObj.text} as complete`}
        />

        {itemObj.checked && itemObj.mark === "x-mark" && (
          <span
            className="position-absolute top-50 start-0 translate-middle-y"
            style={{ left: "0.35rem", pointerEvents: "none" }}
          >
            <i className="bi bi-x-circle-fill text-danger fs-5"></i>
          </span>
        )}

        <label
          className="form-check-label visually-hidden"
          htmlFor={`checkbox-${sectionName}-${index}`}
        >
          Mark {itemObj.text} as complete
        </label>
      </div>
      <div className="flex-grow-1 me-2">
        {isItemEdit ? (
          <input
            type="text"
            className="form-control"
            id={`edit-${sectionName}-${index}`}
            name={`edit-${sectionName}-${index}`}
            value={textValue}
            onChange={handleTextChange}
            onKeyDown={handleEditKeyDown}
            onBlur={handleEditSubmit}
            autoFocus
          />
        ) : (
          <span
            className={spanClasses.join(" ")}
            style={{
              position: "relative",
              cursor: isRowHover ? "pointer" : "default",
              opacity: isRowHover ? 0.7 : 1,
              transition: "opacity 0.2s, background 0.2s",
            }}
            title="Double-click or click the pencil to edit"
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleDoubleClick(e);
            }}
          >
            {itemObj.text}
            <i
              className={`bi bi-pencil-square ms-2 text-primary transition
              ${isRowHover ? "opacity-100" : "opacity-0"}`}
              aria-hidden="true"
              title="Edit item"
              style={{
                cursor: "pointer",
                marginLeft: "0.5em",
                transition: "all 0.2s",
                fontSize: "1.1em",
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleDoubleClick(e);
              }}
            ></i>
          </span>
        )}
      </div>
      <div className="flex-shrink-0" style={{ width: "28px" }}>
        <button
          className={`btn btn-bg btn-outline-danger p-0 ${
            isRowHover ? "opacity-100" : "opacity-0"
          }`}
          id={`delete-${sectionName}-${index}`}
          aria-label={`Delete ${itemObj.text}`}
          title={`Delete ${itemObj.text}`}
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteItem(sectionName, index);
          }}
        >
          <i className="bi bi-trash3-fill"></i>
        </button>
      </div>
    </li>
  );
}

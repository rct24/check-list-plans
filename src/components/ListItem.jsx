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

  return (
    <li
      className="list-group-item d-flex align-items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="form-check">
        <input
          className="form-check-input me-2"
          type="checkbox"
          id={`checkbox-${sectionName}-${index}`}
          name={`checkbox-${sectionName}-${index}`}
          checked={itemObj.checked}
          onChange={() => handleToggleItem(sectionName, index)}
          aria-label={`Mark ${itemObj.text} as complete`}
        />
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
            className={`d-block ${
              itemObj.checked
                ? "text-decoration-line-through fst-italic opacity-50"
                : ""
            }`}
            onDoubleClick={(e) => {
              e.stopPropagation();
              handleDoubleClick(e);
            }}
          >
            {itemObj.text}
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

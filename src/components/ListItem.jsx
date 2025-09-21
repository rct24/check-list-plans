import { SideBarContext, useSideBarContext } from "../context/SidebarContext";

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
      <input
        className="form-check-input me-2"
        type="checkbox"
        id={`checkbox-${sectionName}-${index}`}
        name={`checkbox-${sectionName}-${index}`}
        checked={itemObj.checked}
        onChange={() => handleToggleItem(sectionName, index)}
      />
      <div
        className="flex-grow-1"
        onDoubleClick={(e) => {
          e.stopPropagation();
          handleDoubleClick(e);
        }}
      >
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
            className={
              itemObj.checked
                ? "text-decoration-line-through fst-italic opacity-50"
                : ""
            }
          >
            {itemObj.text}
          </span>
        )}
      </div>
      <button
        className="btn btn-sm p-0 px-1 btn-outline-danger ms-4"
        id={`delete-${sectionName}-${index}`}
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteItem(sectionName, index);
        }}
        hidden={!isRowHover}
      >
        ❌
      </button>
    </li>
  );
}

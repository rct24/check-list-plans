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
  handleToggleItem,
  handleDeleteItem,
  handleEditKeyDown,
  handleEditSubmit,
  handleTextChange,
}) {
  return (
    <li
      className="list-group-item d-flex align-items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <input
        className="form-check-input me-2"
        type="checkbox"
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
        className="btn btn-sm btn-outline-danger ms-3"
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

export function ItemContent({
  itemObj,
  sectionName,
  index,
  isRowHover,
  isItemEdit,
  textValue,
  handleDoubleClick,
  handleEditKeyDown,
  handleEditSubmit,
  handleTextChange,
}) {
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
  );
}

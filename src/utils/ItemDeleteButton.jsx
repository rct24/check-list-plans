export function ItemDeleteButton({
  itemObj,
  sectionName,
  index,
  isRowHover,
  handleDeleteItem,
}) {
  return (
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
  );
}

export default function NewItemInput({
  safeSectionName,
  newItemInputValue,
  handleNewItemChange,
  handleNewItemKeyDown,
  handleItemValueSubmit,
  isHidden,
}) {
  if (isHidden) return null;

  return (
    <li className="list-group-item">
      <div className="d-flex gap-2">
        <div className="flex-grow-1">
          <input
            className="form-control"
            type="text"
            id={`new-item-input-${safeSectionName}`}
            name={`new-item-input-${safeSectionName}`}
            placeholder="Add new item to list"
            value={newItemInputValue}
            onChange={handleNewItemChange}
            onKeyDown={handleNewItemKeyDown}
          />
        </div>
        <button
          className="btn btn-primary"
          id={`add-item-button-${safeSectionName}`}
          onClick={handleItemValueSubmit}
        >
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
    </li>
  );
}

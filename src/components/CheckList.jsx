import ListItemContainer from "../containers/ListItemContainer";
import { SideBarContext, useSideBarContext } from "../context/SidebarContext";

export default function CheckList({
  list,
  sectionName,
  isHover,
  isEditSectionName,
  isEditSectionItemsActive,
  isDeleteSectionConfirmed,
  tempSectionName,
  newItemInputValue,
  sectionNameInputRef,
  handleMouseEnter,
  handleMouseLeave,
  handleSectionNameChange,
  handleSectionNameKeyDown,
  handleSectionNameSubmit,
  handleSectionNameDoubleClick,
  handleToggleEdit,
  handleDeleteConfirm,
  handleCancelDelete,
  handleEditItem,
  handleNewItemChange,
  handleNewItemKeyDown,
  handleItemValueSubmit,
}) {
  const { handleDeleteSection } = useSideBarContext(SideBarContext);

  const safeSectionName = sectionName
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase();

  return (
    <div className="card mb-3">
      <div
        className="card-header d-flex align-items-center gap-2 py-2"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isEditSectionName ? (
          <input
            ref={sectionNameInputRef}
            type="text"
            className="form-control"
            id={`section-name-edit-${safeSectionName}`}
            name={`section-name-edit-${safeSectionName}`}
            value={tempSectionName}
            onChange={handleSectionNameChange}
            onKeyDown={handleSectionNameKeyDown}
            onBlur={handleSectionNameSubmit}
            autoFocus
          />
        ) : (
          <h5
            className="mb-0 flex-grow-1"
            onDoubleClick={handleSectionNameDoubleClick}
          >
            {sectionName}
          </h5>
        )}
        <div className="btn-group btn-group-sm" style={{ width: "100px" }}>
          <button
            className={`btn btn-secondary ${
              isHover ? "opacity-100" : "opacity-0"
            }`}
            id={`toggle-edit-${safeSectionName}`}
            onClick={handleToggleEdit}
          >
            {isEditSectionItemsActive ? "✖" : "➕"}
          </button>
          {!isDeleteSectionConfirmed ? (
            <button
              className={`btn btn-warning ${
                isHover ? "opacity-100" : "opacity-0"
              }`}
              id={`delete-confirm-${safeSectionName}`}
              onClick={handleDeleteConfirm}
            >
              <i className="bi bi-trash3-fill text-dark-emphasis"></i>
            </button>
          ) : (
            <>
              <button
                className={`btn btn-success ${
                  isHover ? "opacity-100" : "opacity-0"
                }`}
                id={`delete-confirm-yes-${safeSectionName}`}
                onClick={() => handleDeleteSection(sectionName)}
              >
                <i className="bi bi-check-lg"></i>
              </button>
              <button
                className={`btn btn-danger ${
                  isHover ? "opacity-100" : "opacity-0"
                }`}
                id={`delete-confirm-no-${safeSectionName}`}
                onClick={handleCancelDelete}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </>
          )}
        </div>
      </div>

      <ul className="list-group list-group-flush">
        {list.map((itemObj, index) => (
          <ListItemContainer
            key={index}
            itemObj={itemObj}
            index={index}
            sectionName={sectionName}
            handleEditItem={handleEditItem}
          />
        ))}

        <li className="list-group-item" hidden={!isEditSectionItemsActive}>
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
              Add item
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

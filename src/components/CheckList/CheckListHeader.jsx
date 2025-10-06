export default function CheckListHeader({
  sectionName,
  safeSectionName,
  isEditSectionName,
  tempSectionName,
  isHover,
  isEditSectionItemsActive,
  isDeleteSectionConfirmed,
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
  handleDeleteSection,
}) {
  return (
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
          className="mb-0 flex-grow-1 text-truncate"
          style={{
            position: "relative",
            cursor: isHover ? "pointer" : "default",
            opacity: isHover ? 0.7 : 1,
            transition: "opacity 0.2s, background 0.2s",
          }}
          title="Double-click or click the pencil to edit"
          onDoubleClick={handleSectionNameDoubleClick}
        >
          {sectionName}
          <i
            className={`bi bi-pencil-square ms-2 text-primary transition ${
              isHover ? "opacity-100" : "opacity-0"
            }`}
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
              handleSectionNameDoubleClick(e);
            }}
          ></i>
        </h5>
      )}

      <div className="btn-group btn-group-sm flex-shrink-0">
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
  );
}

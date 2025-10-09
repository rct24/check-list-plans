export function ItemToggleAndMark({
  itemObj,
  sectionName,
  index,
  handleToggleItem,
}) {
  const isCheckedMark = itemObj.checked && itemObj.mark === "check";
  const isXMark = itemObj.checked && itemObj.mark === "x-mark";

  return (
    <div className="form-check position-relative">
      <input
        className="form-check-input me-2"
        type="checkbox"
        id={`checkbox-${sectionName}-${index}`}
        name={`checkbox-${sectionName}-${index}`}
        checked={isCheckedMark}
        onChange={() => handleToggleItem(sectionName, index)}
        aria-label={`Mark ${itemObj.text} as complete`}
      />

      {isXMark && (
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
  );
}

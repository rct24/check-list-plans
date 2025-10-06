export default function DrawTabContent({
  isDraw,
  handleSetIsDraw,
  clearCanvas,
}) {
  return (
    <div className="card-body d-flex gap-2">
      {isDraw ? (
        <button
          className="btn btn-danger"
          type="button"
          id="draw-stop"
          name="draw-stop"
          onClick={() => handleSetIsDraw(false)}
        >
          Stop
        </button>
      ) : (
        <button
          className="btn btn-success"
          type="button"
          id="draw-start"
          name="draw-start"
          onClick={() => handleSetIsDraw(true)}
        >
          Start
        </button>
      )}
      <button
        className="btn btn-secondary"
        type="button"
        id="draw-clear"
        name="draw-clear"
        onClick={() => {
          handleSetIsDraw(false);
          clearCanvas();
        }}
      >
        Hide
      </button>
    </div>
  );
}

export default function ResizeHandle({ width, isResizing, onMouseDown }) {
  return (
    <div
      className="position-fixed h-100 d-flex align-items-center"
      style={{
        width: "16px",
        left: `calc(100% - ${width}px - 8px)`,
        top: 0,
        zIndex: 1000,
        cursor: "ew-resize",
      }}
      onMouseDown={onMouseDown}
    >
      <div
        className="resize-handle d-flex align-items-center bg-light rounded-pill shadow-sm"
        style={{
          width: "32px",
          height: "80px",
          transform: "translateX(-8px)",
          transition: "all 0.2s ease",
          backgroundColor: isResizing
            ? "var(--bs-primary-bg-subtle)"
            : "var(--bs-light)",
        }}
      >
        <div className="d-flex flex-column gap-2 mx-auto">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`rounded-circle ${
                isResizing ? "bg-primary" : "bg-secondary"
              }`}
              style={{
                width: "4px",
                height: "4px",
                opacity: 0.8,
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

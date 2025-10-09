import React from "react";

const ResizeHandle = React.forwardRef(function ResizeHandle(
  { width, isResizing, onPointerDown },
  ref
) {
  return (
    <div
      ref={ref}
      className="position-fixed h-100 d-flex align-items-center"
      style={{
        width: "16px",
        left: `calc(100% - ${width}px - 8px)`,
        top: 0,
        zIndex: 1030,
        cursor: "ew-resize",
        userSelect: "none",
        touchAction: "none",
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        onPointerDown(e);
      }}
    >
      <div
        className={`
          d-flex align-items-center rounded-pill shadow-sm
          ${isResizing ? "bg-primary-subtle" : "bg-light"}
        `}
        style={{
          width: "32px",
          height: isResizing ? "400px" : "80px",
          transform: "translateX(-8px)",
          transition: isResizing ? "none" : "all 0.5s ease",
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
                width: "5px",
                height: "5px",
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

export default ResizeHandle;

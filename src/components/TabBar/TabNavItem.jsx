export default function TabNavItem({ id, label, isActive, onClick }) {
  return (
    <li className="nav-item">
      <button
        className={`nav-link ${isActive ? "active" : ""}`}
        id={`${id}-tab`}
        name={`${id}-tab`}
        aria-current={isActive ? "page" : undefined}
        onClick={onClick}
        style={{ cursor: "pointer" }}
        type="button"
      >
        {label}
      </button>
    </li>
  );
}

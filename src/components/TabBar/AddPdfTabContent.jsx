<<<<<<< HEAD
import { useId } from "react";

=======
>>>>>>> 63ee775 (Refactor TabBar component; restructure tab content into separate components and update import paths for improved organization and maintainability.)
export default function AddPdfTabContent({ onFileChange }) {
  const fileId = useId();

  return (
    <div className="card-body">
      <div className="mb-3">
        <label htmlFor={fileId} className="form-label">
          Load from file:
        </label>
        <input
          id={fileId}
          onChange={onFileChange}
          type="file"
          className="form-control"
        />
      </div>
    </div>
  );
}

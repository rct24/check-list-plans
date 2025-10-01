import { useId } from "react";

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

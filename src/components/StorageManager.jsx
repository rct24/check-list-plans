// src/components/StorageManager.jsx
import { useEffect, useState } from "react";
import { checkStorage, clearAllStoredData } from "../utils/storageUtils";
import { useAppContext } from "../context/AppContext";

export default function StorageManager() {
  const [storageInfo, setStorageInfo] = useState(null);
  const { fileMap } = useAppContext();

  useEffect(() => {
    setStorageInfo(checkStorage());
  }, [fileMap]);

  if (!storageInfo) return null;

  return (
    <div className="storage-manager mt-3 mb-3">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Storage</h5>
          {storageInfo.isFull && (
            <span className="badge bg-warning">Storage Almost Full</span>
          )}
        </div>
        <div className="card-body">
          <p>Used: {storageInfo.totalSize}</p>
          <p>Remaining: {storageInfo.remaining}</p>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => {
              if (
                window.confirm("Clear all stored data? This cannot be undone.")
              ) {
                clearAllStoredData();
                window.location.reload();
              }
            }}
          >
            Clear Storage
          </button>
        </div>
      </div>
    </div>
  );
}

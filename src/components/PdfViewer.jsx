import { useState } from "react";

export default function PdfViewer() {
  const [fileName, setFileName] = useState("R501_Plan cofraj stalp S1.pdf");

  return (
    <div className="col-10 p-3 vh-100 d-flex">
      <iframe
        src={"/check-list-plans/" + fileName}
        title="PDF Viewer"
        className="w-100 h-100 border-0"
        style={{ minHeight: 0 }}
      />
    </div>
  );
}

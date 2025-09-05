import { PDFViewer } from "@react-pdf/renderer";
import SidebarContainer from "./containers/SidebarContainer";
PDFViewer;
SidebarContainer;
function App() {
  return (
    <div className="container-fluid">
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        <div className="col-10 d-flex align-items-stretch">
          <iframe
            src="/check-list-plans/R501_Plan cofraj stalp S1.pdf"
            title="PDF Viewer"
            width="100%"
            height="100%"
            style={{ border: "none", minHeight: "100vh" }}
          />
        </div>
        <div className="col-2 d-flex flex-column">
          <SidebarContainer />
        </div>
      </div>
    </div>
  );
}

export default App;

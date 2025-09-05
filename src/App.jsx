import PdfViewer from "./components/PdfViewer";
import SidebarContainer from "./containers/SidebarContainer";

function App() {
  return (
    <div className="container-fluid">
      <PdfViewer />
      <SidebarContainer />
    </div>
  );
}

export default App;

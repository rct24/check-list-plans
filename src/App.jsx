import PdfViewer from "./components/PdfViewer";
import SidebarContainer from "./containers/SidebarContainer";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AppContextProvider } from "./context/AppContextProvider";

function App() {
  return (
    <AppContextProvider>
      <div className="container-fluid">
        <PdfViewer />
        <SidebarContainer />
      </div>
    </AppContextProvider>
  );
}

export default App;

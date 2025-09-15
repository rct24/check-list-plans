import PdfViewer from "./components/PdfViewer";
import SidebarContainer from "./containers/SidebarContainer";
import { useState, useRef } from "react";
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

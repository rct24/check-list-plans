import SidebarContainer from "./containers/SidebarContainer";

function App() {
  return (
    <div className="container-fluid">
      <div className="col-4 position-absolute top-50 start-50 translate-middle text-center card p-4 shadow">
        <h1>Welcome to Plan Checker</h1>
        <p>Select a plan from the Plan selection dropdown</p>
      </div>

      <SidebarContainer />
    </div>
  );
}

export default App;

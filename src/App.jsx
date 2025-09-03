import { useState } from "react";
import CheckListContainer from "./containers/CheckListContainer";
import { cofrajPana, armarePana } from "./constants/constants";

function App() {
  const [planList, setPlanList] = useState([
    "R423_Plan cofraj soclu SP12",
    "R424_Plan armare soclu SP12",
    "R425_Plan cofraj soclu SP13",
    "R426_Plan armare soclu SP13",
    "R427_Plan cofraj soclu SP14",
    "R428_Plan armare soclu SP14",
    "R429_Plan cofraj soclu SP15",
    "R430_Plan armare soclu SP15",
    "R435_Plan cofraj soclu SP18",
    "R436_Plan armare soclu SP18",
    "R438_Plan cofraj soclu SP19",
    "R439_Plan armare soclu SP19",
    "R441_Plan cofraj soclu SP21",
    "R442_Plan armare soclu SP21",
    "R444_Plan cofraj soclu SP22",
    "R445_Plan armare soclu SP22",
    "R446_Plan cofraj soclu SP23",
  ]);

  const [plansData, setPlansData] = useState(() => {
    const defaultSections = [
      "Elevatie",
      "Sectiuni",
      "Piese inglobate",
      "Note",
      "Cartus",
    ];

    const data = {};

    planList.forEach((plan) => {
      if (plan.toLowerCase().includes("cofraj")) {
        data[plan] = JSON.parse(JSON.stringify(cofrajPana));
      } else if (plan.toLowerCase().includes("armare")) {
        data[plan] = JSON.parse(JSON.stringify(armarePana));
      } else {
        data[plan] = {};
        defaultSections.forEach((section) => {
          data[plan][section] = [];
        });
      }
    });
    return data;
  });

  const [selectedPlan, setSelectedPlan] = useState(planList[0]);
  const [sectionInput, setSectionInput] = useState("");

  function handleAddSection() {
    if (sectionInput.trim() === "") return;

    if (plansData[selectedPlan][sectionInput]) {
      alert("Section already exists!");
      return;
    }

    setPlansData((prev) => {
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          [sectionInput]: [],
        },
      };
    });
    setSectionInput("");
  }

  function handleAddItem(sectionName, itemText) {
    setPlansData((prev) => {
      const sectionList = prev[selectedPlan][sectionName] || [];
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          [sectionName]: [...sectionList, { text: itemText, checked: false }],
        },
      };
    });
  }

  function handleDeleteItem(sectionName, index) {
    setPlansData((prev) => {
      const sectionList = prev[selectedPlan][sectionName] || [];
      const newList = sectionList.filter((_, idx) => idx !== index);
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          [sectionName]: newList,
        },
      };
    });
  }

  function handleEditItem(sectionName, index, newTextValue) {
    setPlansData((prev) => {
      const sectionToDoList = prev[selectedPlan][sectionName] || [];
      console.log({ plansData });

      const newList = sectionToDoList.map((item, i) =>
        i === index ? { ...item, text: newTextValue } : item
      );

      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          [sectionName]: newList,
        },
      };
    });
  }

  function handleToggleItem(sectionName, index) {
    setPlansData((prev) => {
      const sectionList = prev[selectedPlan][sectionName] || [];
      const newList = sectionList.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      );
      return {
        ...prev,
        [selectedPlan]: {
          ...prev[selectedPlan],
          [sectionName]: newList,
        },
      };
    });
  }

  function handleEditSection(sectionName, newSectionName) {
    setPlansData((prev) => {
      if (prev[selectedPlan][newSectionName]) {
        alert("Section name already exists!");
        return prev;
      }
      const sectionToDoList = prev[selectedPlan][sectionName] || [];
      const updatedSections = {};
      const entries = Object.entries(prev[selectedPlan]);
      for (let [key, value] of entries) {
        if (key === sectionName) {
          updatedSections[newSectionName] = sectionToDoList;
        } else {
          updatedSections[key] = value;
        }
      }
      return {
        ...prev,
        [selectedPlan]: updatedSections,
      };
    });
  }

  function handleDeleteSection(sectionName) {
    setPlansData((prev) => {
      const updatedSections = { ...prev[selectedPlan] };
      delete updatedSections[sectionName];
      return {
        ...prev,
        [selectedPlan]: updatedSections,
      };
    });
  }

  const sections = Object.keys(plansData[selectedPlan]);

  return (
    <div className="container-fluid">
      <div className="col-4 position-absolute top-50 start-50 translate-middle text-center card p-4 shadow">
        <h1>Welcome to Plan Checker</h1>
        <p>Select a plan from the Plan selection dropdown</p>
      </div>

      <div
        className="col-2 position-fixed end-0 overflow-auto card shadow-sm p-3"
        style={{ maxHeight: "100vh", top: "0" }}
      >
        <div className="form-floating">
          <select
            className="form-select"
            id="plan-selection"
            name="plans"
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
          >
            {planList.map((plan) => (
              <option key={plan} value={plan}>
                {plan}
              </option>
            ))}
          </select>
          <label className="form-check-label" htmlFor="plan-selection">
            Plan selection:
          </label>
        </div>
        <br />
        <div className="card mb-3">
          <div className="card-header">
            <h5 className="card-title mb-0">Add New Section</h5>
          </div>
          <div className="card-body">
            <div className="form-floating mb-3">
              <input
                className="form-control"
                id="add-section-input"
                type="text"
                name="addSection"
                placeholder="Add new section"
                value={sectionInput}
                onChange={(e) => setSectionInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddSection();
                  }
                }}
              />
              <label htmlFor="floatingSectionInput">Add Section Name</label>
            </div>
            <button
              className="btn btn-primary w-100"
              type="submit"
              onClick={handleAddSection}
            >
              Add Section
            </button>
          </div>
        </div>
        {sections.map((sectionName) => (
          <CheckListContainer
            key={sectionName}
            sectionName={sectionName}
            list={plansData[selectedPlan][sectionName]}
            handleAddItem={(text) => handleAddItem(sectionName, text)}
            handleDeleteItem={handleDeleteItem}
            handleToggleItem={handleToggleItem}
            handleEditItem={handleEditItem}
            handleEditSection={handleEditSection}
            handleDeleteSection={handleDeleteSection}
          />
        ))}
        <br />
        <button
          className="btn btn-secondary"
          onClick={() =>
            console.log(JSON.stringify(plansData[selectedPlan], null, 2))
          }
        >
          Print JSON to Console
        </button>
      </div>
    </div>
  );
}

export default App;

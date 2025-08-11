import CheckList from "./components/CheckList";
import "./App.css";
import { useState } from "react";

function App() {
  const [planList, setPlanList] = useState([
    "R701_Plan cofraj pana PA1",
    "R702_Plan armare pana PA1",
    "R703_Plan cofraj pana PA2",
    "R704_Plan armare pana PA2",
  ]);

  const [sections, setSections] = useState([
    "Elevatie",
    "Sectiuni",
    "Piese inglobate",
    "Note",
    "Cartus",
  ]);

  const [sectionInput, setSectionInput] = useState("");

  function handleSectionAdd() {
    if (sectionInput.trim() === "") return;
    setSections((prevList) => [...prevList, sectionInput]);
    setSectionInput("");
  }

  return (
    <>
      <label htmlFor="plan-selection">Selectie plan:</label>
      <br />
      <select name="plans">
        {planList.map((plan) => (
          <option>{plan}</option>
        ))}
      </select>
      <br />
      <br />
      <input
        type="text"
        placeholder="Add new section"
        value={sectionInput}
        onChange={(e) => setSectionInput(e.target.value)}
      />

      <button onClick={handleSectionAdd}>Add Section</button>

      {sections.map((s, index) => (
        <CheckList key={index} sectionName={s} />
      ))}
    </>
  );
}

export default App;

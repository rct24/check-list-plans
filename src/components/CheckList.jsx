import { useState } from "react";

export default function CheckList({ sectionName }) {
  const [editActive, setEditActive] = useState(true);
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);

  function handleSubmit() {
    if (item.trim() === "") return;
    setList((prevList) => [...prevList, { text: item, checked: false }]);
    setItem("");
  }

  function toggleItem(index) {
    setList((prev) =>
      prev.map((j, i) => (i === index ? { ...j, checked: !j.checked } : j))
    );
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>
            <h2>{sectionName}</h2>
          </td>
          <td>
            <button
              onClick={() => {
                setEditActive((prevState) => !prevState);
              }}
            >
              Edit
            </button>
          </td>
        </tr>
        {list.map((item, index) => (
          <tr key={index}>
            <td>{item.text}</td>
            <td>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleItem(index)}
              />
            </td>
          </tr>
        ))}

        <tr hidden={editActive}>
          <td>
            <input
              type="text"
              placeholder="Add new item to list"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </td>
          <td>
            <button onClick={handleSubmit}>Add item</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

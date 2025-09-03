import { useState, useEffect } from "react";
import ListItem from "../components/ListItem";

export default function ListItemContainer({
  itemObj,
  index,
  sectionName,
  handleToggleItem,
  handleDeleteItem,
  handleEditItem,
}) {
  const [isRowHover, setIsRowHover] = useState(false);
  const [isItemEdit, setIsItemEdit] = useState(false);
  const [textValue, setTextValue] = useState(itemObj.text);

  useEffect(() => {
    setTextValue(itemObj.text);
  }, [itemObj.text]);

  function handleMouseEnter() {
    setIsRowHover(true);
  }
  function handleMouseLeave() {
    setIsRowHover(false);
  }
  function handleDoubleClick() {
    setIsItemEdit(true);
  }
  function handleTextChange(e) {
    setTextValue(e.target.value);
  }
  function handleEditKeyDown(e) {
    if (e.key === "Enter") {
      handleEditSubmit();
    }
    if (e.key === "Escape") {
      setIsItemEdit(false);
      setTextValue(itemObj.text);
    }
  }
  function handleEditSubmit() {
    if (textValue.trim() === "") return;
    handleEditItem(sectionName, index, textValue);
    setIsItemEdit(false);
  }

  return (
    <ListItem
      itemObj={itemObj}
      index={index}
      sectionName={sectionName}
      isRowHover={isRowHover}
      isItemEdit={isItemEdit}
      textValue={textValue}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      handleDoubleClick={handleDoubleClick}
      handleToggleItem={handleToggleItem}
      handleDeleteItem={handleDeleteItem}
      handleEditKeyDown={handleEditKeyDown}
      handleEditSubmit={handleEditSubmit}
      handleTextChange={handleTextChange}
    />
  );
}

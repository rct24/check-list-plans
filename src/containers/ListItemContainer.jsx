import { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import { SideBarContext, useSideBarContext } from "../context/SideBarContext";

export default function ListItemContainer({
  itemObj,
  index,
  sectionName,
  handleToggleItem,
  handleDeleteItem,
}) {
  // States and Context
  const [isRowHover, setIsRowHover] = useState(false);
  const [isItemEdit, setIsItemEdit] = useState(false);
  const [textValue, setTextValue] = useState(itemObj.text);
  const { handleEditItem } = useSideBarContext(SideBarContext);

  // Sync textValue with itemObj.text
  useEffect(() => {
    setTextValue(itemObj.text);
  }, [itemObj.text]);

  // Handle mouse enter
  function handleMouseEnter() {
    setIsRowHover(true);
  }

  // Handle mouse leave
  function handleMouseLeave() {
    setIsRowHover(false);
  }

  // Handle double click to enter edit mode
  function handleDoubleClick() {
    setIsItemEdit(true);
  }

  // Handle text change in edit mode
  function handleTextChange(e) {
    setTextValue(e.target.value);
  }

  // Handle key down in edit mode
  function handleEditKeyDown(e) {
    if (e.key === "Enter") {
      handleEditSubmit();
    }
    if (e.key === "Escape") {
      setIsItemEdit(false);
      setTextValue(itemObj.text);
    }
  }

  // Submit edit
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

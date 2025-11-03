import React, { useState, useEffect } from "react";
import MemoListItem from "../components/ListItem/ListItem";
import { SideBarContext, useSideBarContext } from "../context/SideBarContext";

function ListItemContainer({ itemObj, index, ...props }) {
  const [isRowHover, setIsRowHover] = useState(false);
  const [isItemEdit, setIsItemEdit] = useState(false);
  const [textValue, setTextValue] = useState(itemObj.text);
  const { handleEditItem } = useSideBarContext(SideBarContext);

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
    handleEditItem(props.sectionName, index, textValue);
    setIsItemEdit(false);
  }

  return (
    <MemoListItem
      {...props}
      itemObj={itemObj}
      index={index}
      sectionName={props.sectionName}
      isRowHover={isRowHover}
      isItemEdit={isItemEdit}
      textValue={textValue}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      handleDoubleClick={handleDoubleClick}
      handleEditKeyDown={handleEditKeyDown}
      handleEditSubmit={handleEditSubmit}
      handleTextChange={handleTextChange}
    />
  );
}

const MemoListItemContainer = React.memo(ListItemContainer);
export default MemoListItemContainer;

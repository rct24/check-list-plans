import React from "react";
import { useSideBarContext } from "../../context/SideBarContext";
import { ItemToggleAndMark } from "./ItemToggleAndMark";
import { ItemContent } from "./ItemContent";
import { ItemDeleteButton } from "./ItemDeleteButton";

function ListItem({
  itemObj,
  index,
  isRowHover,
  isItemEdit,
  textValue,
  handleMouseEnter,
  handleMouseLeave,
  handleDoubleClick,
  handleEditKeyDown,
  handleEditSubmit,
  handleTextChange,
  ...props
}) {
  const { handleToggleItem, handleDeleteItem } = useSideBarContext();

  return (
    <li
      className="list-group-item d-flex align-items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ItemToggleAndMark
        itemObj={itemObj}
        sectionName={props.sectionName}
        index={index}
        handleToggleItem={handleToggleItem}
      />

      <ItemContent
        itemObj={itemObj}
        sectionName={props.sectionName}
        index={index}
        isRowHover={isRowHover}
        isItemEdit={isItemEdit}
        textValue={textValue}
        handleDoubleClick={handleDoubleClick}
        handleEditKeyDown={handleEditKeyDown}
        handleEditSubmit={handleEditSubmit}
        handleTextChange={handleTextChange}
      />

      <ItemDeleteButton
        itemObj={itemObj}
        sectionName={props.sectionName}
        index={index}
        isRowHover={isRowHover}
        handleDeleteItem={handleDeleteItem}
      />
    </li>
  );
}

const MemoListItem = React.memo(ListItem);
export default MemoListItem;

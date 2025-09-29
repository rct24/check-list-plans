import CheckList from "../components/CheckList";
import { useSideBarContext } from "../context/SideBarContext";
import useSectionLogicCRUD from "../hooks/useSectionLogicCRUD";
import useItemLogicCRUD from "../hooks/useItemLogicCRUD";

export default function CheckListContainer({
  list,
  sectionName,
  handleAddItem,
}) {
  const { handleEditSection, handleDeleteSection } = useSideBarContext();

  const sectionCrud = useSectionLogicCRUD({
    sectionName,
    handleEditSection,
    handleDeleteSection,
  });
  const itemsCrud = useItemLogicCRUD({
    list,
    handleAddItem,
  });

  const logic = {
    ...sectionCrud,
    ...itemsCrud,
  };

  return (
    <CheckList
      list={logic.memoizedList}
      sectionName={sectionName}
      isHover={logic.isHover}
      isEditSectionName={logic.isEditSectionName}
      isEditSectionItemsActive={logic.isEditSectionItemsActive}
      isDeleteSectionConfirmed={logic.isDeleteSectionConfirmed}
      tempSectionName={logic.tempSectionName}
      newItemInputValue={logic.newItemInputValue}
      sectionNameInputRef={logic.sectionNameInputRef}
      handleMouseEnter={logic.handleMouseEnter}
      handleMouseLeave={logic.handleMouseLeave}
      handleSectionNameChange={logic.handleSectionNameChange}
      handleSectionNameKeyDown={logic.handleSectionNameKeyDown}
      handleSectionNameSubmit={logic.handleSectionNameSubmit}
      handleSectionNameDoubleClick={logic.handleSectionNameDoubleClick}
      handleToggleEdit={logic.handleToggleEdit}
      handleDeleteConfirm={logic.handleDeleteConfirm}
      handleCancelDelete={logic.handleCancelDelete}
      handleNewItemChange={logic.handleNewItemChange}
      handleNewItemKeyDown={logic.handleNewItemKeyDown}
      handleItemValueSubmit={logic.handleItemValueSubmit}
      handleDeleteSection={logic.handleDeleteSection}
    />
  );
}

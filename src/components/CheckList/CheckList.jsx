import MemoListItemContainer from "../../containers/ListItemContainer";
import {
  SideBarContext,
  useSideBarContext,
} from "../../context/SideBarContext";
import CheckListHeader from "./CheckListHeader";
import NewItemInput from "./NewItemInput";

export default function CheckList({ list, sectionName, ...props }) {
  const { handleDeleteSection } = useSideBarContext(SideBarContext);

  const safeSectionName = sectionName
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase();

  return (
    <div className="card mb-3">
      <CheckListHeader
        sectionName={sectionName}
        safeSectionName={safeSectionName}
        handleDeleteSection={handleDeleteSection}
        {...props}
      />

      <ul className="list-group list-group-flush">
        {list.map((itemObj, index) => (
          <MemoListItemContainer
            key={itemObj.id ?? index}
            itemObj={itemObj}
            index={index}
            sectionName={sectionName}
            handleEditItem={props.handleEditItem}
          />
        ))}

        <NewItemInput
          safeSectionName={safeSectionName}
          newItemInputValue={props.newItemInputValue}
          handleNewItemChange={props.handleNewItemChange}
          handleNewItemKeyDown={props.handleNewItemKeyDown}
          handleItemValueSubmit={props.handleItemValueSubmit}
          isHidden={!props.isEditSectionItemsActive}
        />
      </ul>
    </div>
  );
}

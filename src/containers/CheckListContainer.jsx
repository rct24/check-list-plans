import CheckList from "../components/CheckList/CheckList";
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
    <CheckList {...logic} list={logic.memoizedList} sectionName={sectionName} />
  );
}

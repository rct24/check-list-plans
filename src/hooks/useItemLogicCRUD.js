import { useState, useMemo } from "react";

export default function useItemLogicCRUD({ list, handleAddItem }) {
  const [isEditSectionItemsActive, setIsEditSectionItemsActive] =
    useState(false);
  const [newItemInputValue, setNewItemInputValue] = useState("");

  const handleToggleEdit = () => setIsEditSectionItemsActive((prev) => !prev);
  const handleNewItemChange = (e) => setNewItemInputValue(e.target.value);

  const handleItemValueSubmit = () => {
    if (newItemInputValue.trim() === "") return;
    handleAddItem(newItemInputValue);
    setNewItemInputValue("");
  };

  const handleNewItemKeyDown = (e) => {
    if (e.key === "Enter") handleItemValueSubmit();
    if (e.key === "Escape") {
      setIsEditSectionItemsActive(false);
      setNewItemInputValue("");
    }
  };

  const memoizedList = useMemo(() => list, [list]);

  return {
    memoizedList,
    isEditSectionItemsActive,
    newItemInputValue,
    handleToggleEdit,
    handleNewItemChange,
    handleNewItemKeyDown,
    handleItemValueSubmit,
  };
}

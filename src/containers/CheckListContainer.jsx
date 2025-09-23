import { useState, useEffect, useRef } from "react";
import CheckList from "../components/CheckList";
import { SideBarContext, useSideBarContext } from "../context/SidebarContext";

export default function CheckListContainer({
  list,
  sectionName,
  handleAddItem,
}) {
  const { handleEditSection } = useSideBarContext(SideBarContext);
  const [isEditSectionItemsActive, setIsEditSectionItemsActive] =
    useState(false);
  const [newItemInputValue, setNewItemInputValue] = useState("");
  const [isHover, setIsHover] = useState(false);
  const [isDeleteSectionConfirmed, setIsDeleteSectionConfirmed] =
    useState(false);
  const [isEditSectionName, setIsEditSectionName] = useState(false);
  const [tempSectionName, setTempSectionName] = useState(sectionName);
  const sectionNameInputRef = useRef(null);

  useEffect(() => {
    if (isEditSectionName && sectionNameInputRef.current) {
      sectionNameInputRef.current.focus();
    }
  }, [isEditSectionName]);

  // Add global escape key listener when in edit mode
  useEffect(() => {
    const handleGlobalEscape = (e) => {
      if (e.key === "Escape" && isEditSectionItemsActive) {
        setIsEditSectionItemsActive(false);
        setNewItemInputValue("");
      }
    };

    if (isEditSectionItemsActive) {
      document.addEventListener("keydown", handleGlobalEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleGlobalEscape);
    };
  }, [isEditSectionItemsActive]);

  const handleMouseEnter = () => setIsHover(true);

  const handleMouseLeave = () => setIsHover(false);

  const handleSectionNameChange = (e) => setTempSectionName(e.target.value);

  const handleSectionNameKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSectionNameSubmit();
    }
    if (e.key === "Escape") {
      setIsEditSectionName(false);
      setTempSectionName(sectionName);
    }
  };

  const handleSectionNameDoubleClick = () => {
    setIsEditSectionName(true);
  };

  const handleToggleEdit = () => {
    setIsEditSectionItemsActive((prev) => !prev);
  };

  const handleDeleteConfirm = () => {
    setIsDeleteSectionConfirmed(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteSectionConfirmed(false);
  };

  const handleNewItemChange = (e) => {
    setNewItemInputValue(e.target.value);
  };

  const handleNewItemKeyDown = (e) => {
    if (e.key === "Enter") {
      handleItemValueSubmit();
    }
    if (e.key === "Escape") {
      setIsEditSectionItemsActive(false);
      setNewItemInputValue("");
    }
  };

  function handleItemValueSubmit() {
    if (newItemInputValue.trim() === "") return;
    handleAddItem(newItemInputValue);
    setNewItemInputValue("");
  }

  function handleSectionNameSubmit() {
    if (tempSectionName.trim() === "" || tempSectionName === sectionName) {
      setIsEditSectionName(false);
      setTempSectionName(sectionName);
      return;
    }
    handleEditSection(sectionName, tempSectionName);
    setIsEditSectionName(false);
  }

  return (
    <CheckList
      list={list}
      sectionName={sectionName}
      isHover={isHover}
      isEditSectionName={isEditSectionName}
      isEditSectionItemsActive={isEditSectionItemsActive}
      isDeleteSectionConfirmed={isDeleteSectionConfirmed}
      tempSectionName={tempSectionName}
      newItemInputValue={newItemInputValue}
      sectionNameInputRef={sectionNameInputRef}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      handleSectionNameChange={handleSectionNameChange}
      handleSectionNameKeyDown={handleSectionNameKeyDown}
      handleSectionNameSubmit={handleSectionNameSubmit}
      handleSectionNameDoubleClick={handleSectionNameDoubleClick}
      handleToggleEdit={handleToggleEdit}
      handleDeleteConfirm={handleDeleteConfirm}
      handleCancelDelete={handleCancelDelete}
      handleNewItemChange={handleNewItemChange}
      handleNewItemKeyDown={handleNewItemKeyDown}
      handleItemValueSubmit={handleItemValueSubmit}
    />
  );
}

import { useState, useEffect, useRef } from "react";

export default function useSectionLogicCRUD({
  sectionName,
  handleEditSection,
  handleDeleteSection,
}) {
  const [isHover, setIsHover] = useState(false);
  const [isEditSectionName, setIsEditSectionName] = useState(false);
  const [isDeleteSectionConfirmed, setIsDeleteSectionConfirmed] =
    useState(false);

  const [tempSectionName, setTempSectionName] = useState(sectionName);
  const sectionNameInputRef = useRef(null);

  // --- Effects ---
  useEffect(() => {
    setTempSectionName(sectionName);
  }, [sectionName]);

  // Focus on the input when editing section name starts
  useEffect(() => {
    if (isEditSectionName && sectionNameInputRef.current) {
      sectionNameInputRef.current.focus();
    }
  }, [isEditSectionName]);

  // --- Handlers ---
  const handleMouseEnter = () => setIsHover(true);
  const handleMouseLeave = () => setIsHover(false);

  // SECTION NAME EDITING
  const handleSectionNameChange = (e) => setTempSectionName(e.target.value);

  const handleSectionNameSubmit = () => {
    if (tempSectionName.trim() === "" || tempSectionName === sectionName) {
      setIsEditSectionName(false);
      setTempSectionName(sectionName);
      return;
    }
    handleEditSection(sectionName, tempSectionName);
    setIsEditSectionName(false);
  };

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

  // DELETE
  const handleDeleteConfirm = () => {
    setIsDeleteSectionConfirmed(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteSectionConfirmed(false);
  };

  const handleDeleteSectionFinal = () => {
    handleDeleteSection(sectionName);
  };

  return {
    isHover,
    isEditSectionName,
    isDeleteSectionConfirmed,
    tempSectionName,
    sectionNameInputRef,
    handleMouseEnter,
    handleMouseLeave,
    handleSectionNameChange,
    handleSectionNameKeyDown,
    handleSectionNameSubmit,
    handleSectionNameDoubleClick,
    handleDeleteConfirm,
    handleCancelDelete,
    handleDeleteSection: handleDeleteSectionFinal,
  };
}

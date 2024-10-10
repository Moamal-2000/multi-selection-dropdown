import { useState } from "react";
import DropDownMenu from "./DropDownMenu/DropDownMenu";
import s from "./MultiSelectDropdown.module.css";

const MultiSelectDropdown = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [activeMenus, setActiveMenus] = useState([]);

  function handleSelect(id) {
    setSelectedItems((prev) => {
      const isSelected = prev.includes(id);

      if (!isSelected) {
        const withChildren = addChildNodes(id, data, prev);
        return [...withChildren, id];
      }

      const withoutChildren = removeChildNodes(id, data, prev);
      return withoutChildren.filter((itemId) => itemId !== id);
    });
  }

  function handleToggleMenu(menuId) {
    setActiveMenus((prev) => {
      const isActive = prev.includes(menuId);
      if (!isActive) return [...prev, menuId];
      return prev.filter((itemId) => itemId !== menuId);
    });
  }

  return (
    <div className={s.multiSelectDropDown}>
      <DropDownMenu
        nodes={data}
        selectedItems={selectedItems}
        handleSelect={handleSelect}
        handleToggleMenu={handleToggleMenu}
        activeMenus={activeMenus}
        setActiveMenus={setActiveMenus}
      />
    </div>
  );
};

export default MultiSelectDropdown;

function removeChildNodes(parentId, nodes, selectedItems) {
  const parentNode = findNodeById(parentId, nodes);
  if (!parentNode || !parentNode.Nodes) return selectedItems;

  parentNode.Nodes.forEach((child) => {
    selectedItems = selectedItems.filter((itemId) => itemId !== child.id);
    selectedItems = removeChildNodes(child.id, nodes, selectedItems); // تكرارية
  });

  return selectedItems;
}

function findNodeById(id, nodes) {
  for (let node of nodes) {
    if (node.id === id) return node;

    if (node.Nodes.length > 0) {
      const childNode = findNodeById(id, node.Nodes);

      if (childNode) return childNode;
    }
  }

  return null;
}

function addChildNodes(parentId, nodes, selectedItems) {
  const parentNode = findNodeById(parentId, nodes);
  if (!parentNode || !parentNode.Nodes) return selectedItems;

  parentNode.Nodes.forEach((child) => {
    if (!selectedItems.includes(child.id))
      selectedItems = [...selectedItems, child.id];

    selectedItems = addChildNodes(child.id, nodes, selectedItems);
  });

  return selectedItems;
}

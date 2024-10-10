import { useState } from "react";
import DropDownMenu from "./DropDownMenu/DropDownMenu";
import s from "./MultiSelectDropdown.module.css";

const MultiSelectDropdown = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState([]);

  function handleSelect(id, parentNodeId) {
    setSelectedItems((prev) => {
      const isSelected = prev.includes(id);
      if (!isSelected) return [...prev, id, parentNodeId];

      const withoutChildren = removeChildNodes(id, data, prev);
      const filteredByParentId = withoutChildren.filter(
        (itemId) => itemId !== parentNodeId
      );
      return filteredByParentId.filter((itemId) => itemId !== id);
    });
  }

  return (
    <div className={s.multiSelectDropDown}>
      <DropDownMenu
        nodes={data}
        selectedItems={selectedItems}
        handleSelect={handleSelect}
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

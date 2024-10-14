import { useState } from "react";
import { dropDownData } from "../../Data/dropdownData";
import { findNodeById } from "../../Functions/helper";
import MultiSelectionDropdown from "./MultiSelectionDropdown/MultiSelectionDropdown";
import SelectionInput from "./SelectionInput/SelectionInput";
import s from "./MultiSelectionSection.module.css"; 

const MultiSelectionSection = () => {
  const [checkedState, setCheckedState] = useState({
    checkedNodes: [],
    indeterminateNodes: [],
    selectedItems: [],
  });

  let selectedItems = checkedState.checkedNodes.map((id) =>
    findNodeById(dropDownData, id)
  );

  selectedItems.forEach((node) => {
    if (node.Nodes.length > 0) {
      const currentNode = findNodeById(dropDownData, node.id);
      const currentNodeIds = currentNode.Nodes.map((node) => node.id);
      const allChildrenChecked = node.Nodes.every((child) =>
        currentNodeIds.includes(child.id)
      );

      if (allChildrenChecked) {
        selectedItems = selectedItems.filter(
          (node) => !currentNodeIds.includes(node.id)
        );
      }
    }
  });

  return (
    <section className={s.multiSelectionSection}>
      <SelectionInput selectedItems={selectedItems} placeholder="Choose..." />
      <MultiSelectionDropdown
        data={dropDownData}
        checkedState={checkedState}
        setCheckedState={setCheckedState}
      />
    </section>
  );
};
export default MultiSelectionSection;

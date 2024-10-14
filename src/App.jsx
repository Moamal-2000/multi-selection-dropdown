import { useState } from "react";
import MultiSelectDropdown from "./Components/MultiSelectDropdown/MultiSelectDropdown";
import SelectionInput from "./Components/MultiSelectDropdown/SelectionInput/SelectionInput";
import { dropDownData } from "./Data/dropdownData";
import { findNodeById } from "./Functions/helper";

function App() {
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
    <div className="App">
      <SelectionInput selectedItems={selectedItems} placeholder="Choose..." />
      <MultiSelectDropdown
        data={dropDownData}
        checkedState={checkedState}
        setCheckedState={setCheckedState}
      />
    </div>
  );
}

export default App;

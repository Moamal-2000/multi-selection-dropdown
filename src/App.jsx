import { useState } from "react";
import MultiSelectDropdown from "./Components/MultiSelectDropdown/MultiSelectDropdown";
import SelectionInput from "./Components/MultiSelectDropdown/SelectionInput/SelectionInput";
import { dropDownData } from "./Data/dropdownData";
import { findNodeById } from "./Functions/helper";

function App() {
  const [checkedState, setCheckedState] = useState({
    checkedNodes: [],
    indeterminateNodes: [],
  });
  const selectedItems = checkedState.checkedNodes.map((id) =>
    findNodeById(dropDownData, id)
  );

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

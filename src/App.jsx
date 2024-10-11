import MultiSelectDropdown from "./Components/MultiSelectDropdown/MultiSelectDropdown";
import { dropDownData } from "./Data/dropdownData";

function App() {
  return (
    <div className="App">
      <MultiSelectDropdown data={dropDownData} />
    </div>
  );
}

export default App;

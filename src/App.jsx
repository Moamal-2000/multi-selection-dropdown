import MultiSelectDropdown from "./Components/MultiSelectDropdown/MultiSelectDropdown";
import { dropDownData } from "./Data/dropdownData";
import "./main.css";

function App() {
  return (
    <div className="App">
      <MultiSelectDropdown data={dropDownData} />
    </div>
  );
}

export default App;

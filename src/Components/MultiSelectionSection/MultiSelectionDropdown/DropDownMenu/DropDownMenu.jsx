import { useState } from "react";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import s from "./DropDownMenu.module.css";

const DropDownMenu = ({
  node,
  onNodeCheck,
  checkedState,
  type = "outer-menu",
}) => {
  const [expanded, setExpanded] = useState(false);

  const isLastNode = node.Nodes.length !== 0;
  const isChecked = checkedState.checkedNodes.includes(node.id);
  const isIndeterminate = checkedState.indeterminateNodes.includes(node.id);
  const lastItemClass = !isLastNode ? s.lastItem : "";
  const innerMenuClass = type === "inner-menu" ? s.innerMenu : "";

  function handleCheckboxChange(event) {
    const isChecked = event.target.checked;
    onNodeCheck(node, isChecked);
  }

  return (
    <div className={`${s.menu} ${innerMenuClass}`}>
      <div className={`${s.item} ${lastItemClass}`}>
        {isLastNode && (
          <button
            type="button"
            className={s.toggleButton}
            onClick={() => setExpanded(!expanded)}
          >
            {node.Nodes.length > 0 && (expanded ? "-" : "+")}
          </button>
        )}

        <CustomCheckbox
          node={node}
          isChecked={isChecked}
          isIndeterminate={isIndeterminate}
          handleCheckboxChange={handleCheckboxChange}
        />
      </div>

      {expanded && (
        <div className={s.otherMenu}>
          {node.Nodes.length > 0 &&
            node.Nodes.map((childNode) => (
              <DropDownMenu
                key={childNode.id}
                node={childNode}
                onNodeCheck={onNodeCheck}
                checkedState={checkedState}
                type="inner-menu"
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;

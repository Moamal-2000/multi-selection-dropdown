import { findNodeById } from "../../Functions/helper";
import DropDownMenu from "./DropDownMenu/DropDownMenu";
import s from "./MultiSelectDropdown.module.css";

const MultiSelectDropdown = ({ data, checkedState, setCheckedState }) => {
  function updateChildren(node, isChecked, updatedCheckedNodes) {
    if (isChecked) {
      if (!updatedCheckedNodes.includes(node.id)) {
        updatedCheckedNodes.push(node.id);
      }
    } else {
      updatedCheckedNodes = updatedCheckedNodes.filter((id) => id !== node.id);
    }

    node.Nodes.forEach((child) => {
      updatedCheckedNodes = updateChildren(
        child,
        isChecked,
        updatedCheckedNodes
      );
    });

    return updatedCheckedNodes;
  }

  function handleNodeCheck(node, isChecked) {
    const {
      updatedCheckedNodes,
      updatedIndeterminateNodes,
      updatedSelectedItems,
    } = updateCheckedState(node, isChecked);

    setCheckedState({
      checkedNodes: updatedCheckedNodes,
      indeterminateNodes: updatedIndeterminateNodes,
      selectedItems: updatedSelectedItems,
    });
  }

  function updateCheckedState(currentNode, isChecked) {
    let updatedCheckedNodes = [...checkedState.checkedNodes];
    let updatedIndeterminateNodes = [...checkedState.indeterminateNodes];
    let updatedSelectedItems = [...checkedState.selectedItems];

    if (isChecked) {
      if (!updatedCheckedNodes.includes(currentNode.id)) {
        updatedCheckedNodes.push(currentNode.id);
      }
      updatedIndeterminateNodes = updatedIndeterminateNodes.filter(
        (id) => id !== currentNode.id
      );
      updatedSelectedItems.push(currentNode);
    } else {
      updatedCheckedNodes = updatedCheckedNodes.filter(
        (id) => id !== currentNode.id
      );
      updatedSelectedItems = updatedSelectedItems.filter(
        (node) => node.id !== currentNode.id
      );
    }

    updatedCheckedNodes = updateChildren(
      currentNode,
      isChecked,
      updatedCheckedNodes
    );

    function updateParentState(parentNodeId) {
      const parentNode = findNodeById(data, parentNodeId);
      if (!parentNode) return;

      const childIds = parentNode.Nodes.map((child) => child.id);
      const checkedChildren = childIds.filter((id) =>
        updatedCheckedNodes.includes(id)
      );
      const indeterminateChildren = childIds.filter((id) =>
        updatedIndeterminateNodes.includes(id)
      );

      const allChildrenChecked =
        checkedChildren.length === childIds.length &&
        indeterminateChildren.length === 0;

      const noChildrenChecked =
        checkedChildren.length === 0 && indeterminateChildren.length === 0;

      if (noChildrenChecked) {
        updatedIndeterminateNodes = updatedIndeterminateNodes.filter(
          (id) => id !== parentNode.id
        );
        updatedCheckedNodes = updatedCheckedNodes.filter(
          (id) => id !== parentNode.id
        );
      } else if (allChildrenChecked) {
        updatedIndeterminateNodes = updatedIndeterminateNodes.filter(
          (id) => id !== parentNode.id
        );
        if (!updatedCheckedNodes.includes(parentNode.id)) {
          updatedCheckedNodes.push(parentNode.id);
        }
      } else {
        if (!updatedIndeterminateNodes.includes(parentNode.id)) {
          updatedIndeterminateNodes.push(parentNode.id);
        }
        updatedCheckedNodes = updatedCheckedNodes.filter(
          (id) => id !== parentNode.id
        );
      }

      updateParentState(parentNode.Parentnodeid);
    }

    updateParentState(currentNode.Parentnodeid);
    return {
      updatedCheckedNodes,
      updatedIndeterminateNodes,
      updatedSelectedItems,
    };
  }

  return (
    <div className={s.multiSelectDropDown}>
      {data.map((node) => (
        <DropDownMenu
          key={node.id}
          node={node}
          onNodeCheck={handleNodeCheck}
          checkedState={checkedState}
        />
      ))}
    </div>
  );
};

export default MultiSelectDropdown;

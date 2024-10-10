import s from "./CustomCheckbox.module.css";

const CustomCheckbox = ({ selectedItems, node, parentId, handleSelect }) => {
  const innerMenusIds = node.Nodes?.map((childNode) => childNode.id) || [];

  const isAllChildrenChecked =
    innerMenusIds.length > 0 &&
    innerMenusIds.every((id) => selectedItems.includes(id));

  const isSomeChildrenChecked = innerMenusIds.some((id) =>
    selectedItems.includes(id)
  );

  const isChecked = selectedItems.includes(node.id);

  const checkedClass = isChecked ? s.checked : "";
  const halfTickClass = !isChecked && isSomeChildrenChecked ? s.halfTick : "";
  const allCheckedClass = isAllChildrenChecked ? s.allChecked : "";

  return (
    <div
      className={`${s.wrapper} ${checkedClass} ${halfTickClass} ${allCheckedClass}`}
    >
      <input
        className={s.checkbox}
        type="checkbox"
        checked={isChecked}
        aria-checked={isChecked}
        onChange={() => handleSelect(node.id, parentId)}
        id={node.Parentnodeid + "-" + node.id}
      />
    </div>
  );
};

export default CustomCheckbox;

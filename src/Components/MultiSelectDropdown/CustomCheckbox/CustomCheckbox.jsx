import s from "./CustomCheckbox.module.css";

const CustomCheckbox = ({ selectedItems, node, parentId, handleSelect }) => {
  const checkedClass = selectedItems.includes(node.id) ? s.checked : "";
  const halfTickClass = selectedItems.includes(node.id) ? s.halfTick : "";
  const innerMenusIds = node.Nodes?.map((node) => node.id)

  // console.log(node);
  console.log(innerMenusIds);

  return (
    <div className={`${s.wrapper} ${checkedClass} ${halfTickClass}`}>
      <input
        className={s.checkbox}
        type="checkbox"
        checked={selectedItems.includes(node.id)}
        onChange={() => handleSelect(node.id, parentId)}
        id={node.Parentnodeid + "-" + node.id}
      />
    </div>
  );
};
export default CustomCheckbox;

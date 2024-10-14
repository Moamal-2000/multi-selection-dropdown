import s from "./CustomCheckbox.module.css";

const CustomCheckbox = ({
  node,
  isChecked,
  isIndeterminate,
  handleCheckboxChange,
}) => {
  const checkedClass = isChecked ? s.checked : "";
  const halfTickClass = isIndeterminate ? s.halfTick : "";

  return (
    <div className={s.customCheckbox}>
      <div className={`${s.wrapper} ${checkedClass} ${halfTickClass}`}>
        <input
          className={s.checkbox}
          type="checkbox"
          checked={isChecked}
          id={`${node.parentId}-${node.id}`}
          ref={(input) => {
            if (input) input.indeterminate = isIndeterminate;
          }}
          onChange={handleCheckboxChange}
        />
      </div>

      <label htmlFor={`${node.parentId}-${node.id}`} className={s.label}>
        {node.displayname}
      </label>
    </div>
  );
};

export default CustomCheckbox;

{
  /* <div className={s.customCheckbox}>
  <div
    className={`${s.wrapper} ${checkedClass} ${halfTickClass} ${allCheckedClass}`}
  >
    <input
      className={s.checkbox}
      type="checkbox"
      checked={isChecked}
      aria-checked={isChecked}
      onChange={() => handleSelect(node.id, parentId)}
      id={`${parentId}-${node.id}`}
    />
  </div>

  <label htmlFor={`${parentId}-${node.id}`} className={s.label}>
    {node.displayname}
  </label>
</div>; */
}

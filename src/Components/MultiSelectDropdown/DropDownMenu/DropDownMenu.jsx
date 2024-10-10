import s from "./DropDownMenu.module.css";

const DropDownMenu = ({
  nodes,
  parentId = null,
  selectedItems,
  handleSelect,
  type = "outer-menu",
}) => {
  const menuClass = type === "inner-menu" ? s.innerMenu : s.outerMenu;

  return nodes.map((node) => (
    <div key={node.id} className={menuClass}>
      <input
        className={s.checkbox}
        type="checkbox"
        checked={selectedItems.includes(node.id)}
        onChange={() => handleSelect(node.id, parentId)}
        id={node.Parentnodeid + "-" + node.id}
      />

      <label htmlFor={node.Parentnodeid + "-" + node.id} className={s.label}>
        {node.displayname}
      </label>

      {node.Nodes.length > 0 && (
        <DropDownMenu
          nodes={node.Nodes}
          parentId={node.id}
          handleSelect={handleSelect}
          selectedItems={selectedItems}
          type="inner-menu"
        />
      )}
    </div>
  ));
};
export default DropDownMenu;

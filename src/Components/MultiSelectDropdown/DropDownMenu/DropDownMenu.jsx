import s from "./DropDownMenu.module.css";

const DropDownMenu = ({
  nodes,
  parentId = null,
  selectedItems,
  handleSelect,
  type = "outer-menu",
}) => {
  const innerMenuClass = type === "inner-menu" ? s.innerMenu : "";
  const lastItemClass = nodes?.[0].Nodes.length === 0 ? s.lastItem : "";


  function handleToggleMenu() {}

  return nodes.map((node) => (
    <div key={node.id} className={`${s.menu} ${innerMenuClass}`}>
      <div className={`${s.item} ${lastItemClass}`}>
        {node.Nodes.length > 0 && (
          <button
            type="button"
            className={s.toggleButton}
            onClick={handleToggleMenu}
          >
            +
          </button>
        )}

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
      </div>

      {node.Nodes.length > 0 && (
        <div className={s.otherMenu}>
          <DropDownMenu
            nodes={node.Nodes}
            parentId={node.id}
            handleSelect={handleSelect}
            selectedItems={selectedItems}
            type="inner-menu"
          />
        </div>
      )}
    </div>
  ));
};
export default DropDownMenu;

import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import s from "./DropDownMenu.module.css";

const DropDownMenu = ({
  nodes,
  parentId = null,
  selectedItems,
  handleSelect,
  handleToggleMenu,
  activeMenus,
  setActiveMenus,
  type = "outer-menu",
}) => {
  const innerMenuClass = type === "inner-menu" ? s.innerMenu : "";
  const lastItemClass = nodes?.[0].Nodes.length === 0 ? s.lastItem : "";

  return nodes.map((node) => {
    const collapseClass = !activeMenus.includes(node.id) ? s.collapse : "";

    return (
      <div key={node.id} className={`${s.menu} ${innerMenuClass}`}>
        <div className={`${s.item} ${lastItemClass}`}>
          {node.Nodes.length > 0 && (
            <button
              type="button"
              className={`${s.toggleButton} ${collapseClass}`}
              onClick={() => handleToggleMenu(node.id)}
            >
              {collapseClass ? "+" : "-"}
            </button>
          )}

          <CustomCheckbox
            selectedItems={selectedItems}
            node={node}
            parentId={parentId}
            handleSelect={handleSelect}
          />
        </div>

        {node.Nodes.length > 0 && (
          <div className={`${s.otherMenu} ${collapseClass}`}>
            <DropDownMenu
              nodes={node.Nodes}
              parentId={node.id}
              handleSelect={handleSelect}
              handleToggleMenu={handleToggleMenu}
              selectedItems={selectedItems}
              activeMenus={activeMenus}
              setActiveMenus={setActiveMenus}
              type="inner-menu"
            />
          </div>
        )}
      </div>
    );
  });
};
export default DropDownMenu;

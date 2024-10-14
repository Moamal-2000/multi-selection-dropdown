import s from "./SelectionInput.module.css";

const SelectionInput = ({ selectedItems, placeholder }) => {
  return (
    <div className={s.selectionInput}>
      <div className={s.selectedItems}>
        {selectedItems.map((item) => (
          <div key={item.id} className={s.selectedItem}>
            <span>{item.displayname}</span>
            <button type="button">X</button>
          </div>
        ))}
      </div>

      <input type="text" className={s.input} placeholder={placeholder} />
    </div>
  );
};
export default SelectionInput;

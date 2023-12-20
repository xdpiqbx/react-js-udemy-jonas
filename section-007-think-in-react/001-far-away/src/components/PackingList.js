import { useState } from "react";
import Item from "./Item";

export default function PackingList({ items, setItems, onRemoveItem, onToggleItem }) {
    const [sortOption, setSortOption] = useState('packed');
    function handleSortOption(event) {
        setSortOption(event.target.value);
    }
    function handleClear() {
        if (window.confirm("You really want to remove all items?"))
            setItems([]);
    }
    let sortedItems = [];
    switch (sortOption) {
        case "input":
            sortedItems = [...items.sort((a, b) => Number(a.id) - Number(b.id))];
            break;
        case "description":
            sortedItems = [...items.sort((a, b) => a.description.localeCompare(b.description))];
            break;
        case "packed":
            sortedItems = [...items.sort((a, b) => Number(a.packed) - Number(b.packed))];
            break;
        default:
            sortedItems = [...items];
    }
    return (
        <div className="list">
            <ul>
                {sortedItems.map(item => <Item
                    item={item}
                    key={item.id}
                    onRemoveItem={onRemoveItem}
                    onToggleItem={onToggleItem} />)}
            </ul>
            {items.length > 0 ?
                <div className="actions">
                    <select onChange={handleSortOption} value={sortOption}>
                        <option value='input'>Sort by input order</option>
                        <option value='description'>Sort by description</option>
                        <option value='packed'>Sort by packed status</option>
                    </select>
                    <button onClick={handleClear}>Clear list</button>
                </div>
                : ""}
        </div>
    );
}

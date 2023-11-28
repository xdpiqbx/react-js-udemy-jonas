import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];

export default function App() {
    const [items, setItems] = useState(initialItems)
    function handleAddItems(item) {
        setItems(prev => [...prev, item])
    }
    function handleRemoveItem(itemId) {
        setItems(prev => prev.filter(item => item.id !== itemId))
    }
    function handleToggleItem(id) {
      setItems(prev => prev.map((item) => item.id === id ? { ...item, packed: !item.packed } : item ))
    }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} items={items} />
      <PackingList items={items} setItems={setItems} onRemoveItem={handleRemoveItem} onToggleItem={handleToggleItem} />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
    return (
        <h1>🌴 Far Away 👜</h1>
    )
}

function Form({onAddItems, items}) {

    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState(1)

    function handleSubmit(event) {
        event.preventDefault();
        if (!description) {
            return
        }
        const newItemObject = {
            id: items.length === 0 ? 0 : items[items.length - 1].id + 1,
            description: description,
            quantity: quantity,
            packed: false
        }
        onAddItems(newItemObject);
        setDescription("")
        setQuantity(1)
    }
    return (
      <form className="add-form" onSubmit={handleSubmit}>
            <label>What do you need for your 🤩 trip?</label>
            <select value={quantity} onChange={(event)=>setQuantity(Number(event.target.value))}>
                {
                    Array.from({ length: 15 }, (_, i) => i + 1).map(
                        i => <option name="quantity" key={i}>{i}</option>
                    )
                }
            </select>
            <input
                type='text' placeholder="Item..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <button>Add</button>
      </form>
    )
}

function PackingList({ items, setItems, onRemoveItem, onToggleItem }) {
    const [sortOption, setSortOption] = useState('packed')
    function handleSortOption(event) {
        setSortOption(event.target.value)
    }
    function handleClear() {
        if (window.confirm("You really want to remove all items?"))
            setItems([])
    }
    let sortedItems = []
    switch (sortOption) {
        case "input":
            sortedItems = [...items.sort((a ,b) => Number(a.id) - Number(b.id))]
            break;
        case "description":
            sortedItems = [...items.sort((a ,b) => a.description.localeCompare(b.description))]
            break;
        case "packed":
            sortedItems = [...items.sort((a ,b) => Number(a.packed) - Number(b.packed))]
            break;
        default:
            sortedItems = [...items]
    }
    return (
        <div className="list">
            <ul>
              {sortedItems.map(item => <Item
                item={item}
                key={item.id}
                onRemoveItem={onRemoveItem}
                onToggleItem={onToggleItem}
              />)}
            </ul>
            { items.length > 0 ?
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
    )
}

function Item({ item, onRemoveItem, onToggleItem }) {
  return <li>
    <input type="checkbox" value={item.packed} checked={item.packed} onChange={()=>onToggleItem(item.id)}/>
        <span style={item.packed ? { textDecoration: "line-through" } : {}}>
            {item.quantity} {item.description}
        </span>
        <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
}

function Stats({ items }) {
    if (!items.length) {
        return (
            <footer className="stats">
                <em>
                    Start adding some items to your packing list 🚀
                </em>
            </footer>            
        )
    }
    const itemsAmount = items.length
    const packedItemsAmount = items.filter((item)=>item.packed).length
    const percent = Math.round((packedItemsAmount/itemsAmount) * 100)
    return (
        <footer className="stats">
        <em>
            {
                (percent === 100) ? 'You got everything! Ready to go ✈️' : 
                `👜 You have ${itemsAmount} items in your list,
                and you already packed ${packedItemsAmount} (${percent}%)`
            }
        </em>
      </footer>
    )
}

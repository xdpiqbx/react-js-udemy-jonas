import { useEffect } from "react";
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
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onRemoveItem={handleRemoveItem} onToggleItem={handleToggleItem} />
      <Stats />
    </div>
  );
}

function Logo() {
    return (
        <h1>🌴 Far Away 👜</h1>
    )
}

function Form({onAddItems}) {

    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState(1)

    function handleSubmit(event) {
        event.preventDefault();
        if (!description) {
            return
        }
        const newItemObject = {
            id: initialItems[initialItems.length - 1].id + 1,
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

function PackingList({items, onRemoveItem, onToggleItem}) {
    return (
        <div className="list">
            <ul>
              {items.map(item => <Item
                item={item}
                key={item.id}
                onRemoveItem={onRemoveItem}
                onToggleItem={onToggleItem}
              />)}
            </ul>
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

function Stats() {
    return (
      <footer className="stats">
        <em>
          👜 You have X items in your list, and you already packed X (X%)
        </em>
      </footer>
    )
}

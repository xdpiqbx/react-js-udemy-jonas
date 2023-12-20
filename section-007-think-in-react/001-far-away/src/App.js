import { useState } from "react";
import Logo from "./components/Logo"
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

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

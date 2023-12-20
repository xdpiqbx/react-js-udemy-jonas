import { useState } from "react";

export default function Form({ onAddItems, items }) {

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
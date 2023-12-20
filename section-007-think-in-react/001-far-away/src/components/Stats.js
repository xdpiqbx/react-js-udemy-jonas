export default function Stats({ items }) {
    if (!items.length) {
        return (
            <footer className="stats">
                <em>
                    Start adding some items to your packing list 🚀
                </em>
            </footer>
        );
    }
    const itemsAmount = items.length;
    const packedItemsAmount = items.filter((item) => item.packed).length;
    const percent = Math.round((packedItemsAmount / itemsAmount) * 100);
    return (
        <footer className="stats">
            <em>
                {(percent === 100) ? 'You got everything! Ready to go ✈️' :
                    `👜 You have ${itemsAmount} items in your list,
                and you already packed ${packedItemsAmount} (${percent}%)`}
            </em>
        </footer>
    );
}

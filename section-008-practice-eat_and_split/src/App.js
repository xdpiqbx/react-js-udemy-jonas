const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
      </div>
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <button className="button">Select</button>
    </li>
  );
}

// export default function App() {
//   return (
//     <div className="app">
//       <Friends />
//       <SplitBill />
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <div className="app">
//       <Friends />
//       <SplitBill />
//     </div>
//   );
// }

// function AddFriend() {
//   return (
//     <form className="form-add-friend">
//       <label htmlFor="text">👫 Friend name</label>
//       <input id="text" type="text" />
//       <label htmlFor="img">🌄 Image URL</label>
//       <input id="img" type="text" />
//       <Button>Add</Button>
//     </form>
//   );
// }

// function Button({ children }) {
//   return <button className="button">{children}</button>;
// }

// function Friend({ id, image, balance, name }) {
//   return (
//     <li className="selected">
//       <img alt={name} src={image}></img>
//       <h3>{name}</h3>
//       <p>You and {name} are even</p>
//       <p className="green">
//         {name} owes you {balance}€
//       </p>
//       <p className="red">
//         You owe {name} {balance}€{" "}
//       </p>
//       <Button>"Close" : "Select"</Button>
//     </li>
//   );
// }

// export function Friends() {
//   return (
//     <div className="sidebar">
//       <ul>
//         {initialFriends.map(({ id, image, balance, name }) => (
//           <Friend key={id} image={image} balance={balance} name={name} />
//         ))}
//       </ul>
//       <AddFriend />
//       <Button>Close</Button>
//       <Button>Add friend</Button>
//     </div>
//   );
// }

// export function SplitBill() {
//   return (
//     <form className="form-split-bill">
//       <h2>SPLIT A BILL WITH NAME</h2>
//       <label htmlFor="bill">💰 Bill value</label>
//       <input id="bill" type="text" />
//       <label htmlFor="">🧍‍♀️ Your expense</label>
//       <input type="text" />
//       <label>👫 friend.name &apos;s expense</label>
//       <input type="text" disabled />
//       <label htmlFor="">🤑 Who is paying the bill</label>
//       <select>
//         <option value="you">You</option>
//         <option value="other">friend.name</option>
//       </select>

//       <Button>Split bill</Button>
//     </form>
//   );
// }

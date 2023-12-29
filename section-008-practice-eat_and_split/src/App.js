import { useEffect, useState } from "react";

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

const EMPTY_STRING = "";

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectedFriend(friend) {
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectedFriend={handleSelectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendsList({ friends, onSelectedFriend, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelectedFriend={onSelectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelectedFriend, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li className={isSelected ? "selected" : EMPTY_STRING}>
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
      <Button onClick={() => onSelectedFriend(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const DEFAULT_IMAGE = "https://i.pravatar.cc/48?u=";
  const [name, setName] = useState(EMPTY_STRING);
  const [image, setImage] = useState(DEFAULT_IMAGE);
  function handleSubmit(event) {
    if (!name || image === DEFAULT_IMAGE) {
      return;
    }
    event.preventDefault();
    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName(EMPTY_STRING);
    setImage(DEFAULT_IMAGE);
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(event) => setImage(event.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const { name, balance } = selectedFriend;
  const [billValue, setBillValue] = useState(EMPTY_STRING);
  const [paidByUser, setPayedByUser] = useState(EMPTY_STRING);
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = billValue ? billValue - paidByUser : "";
  function handleSubmit(event) {
    event.preventDefault();
    if (!billValue || !paidByUser) {
      return;
    }
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {name}</h2>
      <label>💰 Bill value</label>
      <input
        type="text"
        value={billValue}
        onChange={(event) => setBillValue(Number(event.target.value))}
      />
      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(event) =>
          setPayedByUser(
            Number(event.target.value) > billValue
              ? paidByUser
              : Number(event.target.value)
          )
        }
      />
      <label>👫 {name}'s expense</label>
      <input type="text" value={billValue - paidByUser} disabled />
      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(event) => setWhoIsPaying(event.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>
      <Button>Add</Button>
    </form>
  );
}

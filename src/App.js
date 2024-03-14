import { useState } from "react";
import "./App.css";

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

function App() {
  const [isOpenFriendForm, setIsOpenAddFriendForm] = useState(false);
  const [isOpenFormSplitBill, setIsOpenFormSplitBill] = useState(false);

  function handleAddFriendForm() {
    setIsOpenAddFriendForm((isOpenFriendForm) => !isOpenFriendForm);
  }

  function handleFormSplitBill() {
    setIsOpenFormSplitBill((isOpenFormSplitBill) => !isOpenFormSplitBill);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList handleFormSplitBill={handleFormSplitBill} />

        {isOpenFriendForm && <FormAddFriend />}
        <Button onClick={handleAddFriendForm}>
          {isOpenFriendForm ? "Close" : "Add Friend"}
        </Button>
      </div>

      {isOpenFormSplitBill && (
        <FormSplitBill handleFormSplitBill={handleFormSplitBill} />
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

function FriendsList({ handleFormSplitBill }) {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          handleFormSplitBill={handleFormSplitBill}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, handleFormSplitBill }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 ? (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}€
        </p>
      ) : friend.balance > 0 ? (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}€
        </p>
      ) : (
        <p>You and {friend.name} are even</p>
      )}
      <Button onClick={handleFormSplitBill}>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  const [friendName, setFriendName] = useState("");
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault(); // prevent reload when submit in single page application

    if (!friendName || !friendImage) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      friendName,
      friendImage: `${friendImage}?=${id}`,
      balance: 0,
    };

    // console.log(newFriend);

    setFriendName("");
    setFriendImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input
        type="text"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
      />

      <label>🖼️Image URL</label>
      <input
        type="text"
        value={friendImage}
        onChange={(e) => setFriendImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ handleFormSplitBill }) {
  return (
    <form className="form-split-bill">
      <h2>Split a Bill with X</h2>

      <label>💰Bill value</label>
      <input type="text" />

      <label>🕴️Your expense</label>
      <input type="text" />

      <label>🧑‍🤝‍🧑X's expense</label>
      <input type="text" disabled />

      <label>🤑Who is paying the bill</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>

      <Button onClick={handleFormSplitBill}>Add</Button>
    </form>
  );
}

export default App;

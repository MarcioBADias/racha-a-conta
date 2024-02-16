/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Logo } from "./components/Logo";
import { ListOfItens } from "./components/ListOfItens";
import { FormAddFriend } from "./components/FormAddFriend";
import { FormSelectFriend } from "./components/FormSelectFriend";
import { ButtonAddFriend } from "./components/ButtonAddFriend";

const App = () => {
  const [friends, setFriends] = useState([]);
  const [selectFriend, setSelectFriend] = useState(null);
  const [showFormAddFriend, setShowFormAddFriend] = useState(false);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/MarcioBADias/data-fake/main/initial-friends.json",
    )
      .then((r) => r.json())
      .then((data) => setFriends(data))
      .catch((error) => alert(error.message));
  }, [friends]);

  const handleClickAddFriend = () => setShowFormAddFriend((b) => !b);
  const handleClickFriend = (friend) =>
    setSelectFriend((p) => (p?.id === friend.id ? null : friend));

  const handleSubmitShareBill = (friend) => {
    setFriends((prev) => prev.map((p) => (friend.id === p.id ? friend : p)));
    setSelectFriend(null);
  };

  const handleSubmitAddFriend = (friend) => {
    setFriends((prev) => [...prev, friend]);
    setShowFormAddFriend(false);
  };
  console.log(friends);
  return (
    <>
      <Logo />
      <main className="app">
        <aside className="sidebar">
          <ListOfItens
            friends={friends}
            selectFriend={selectFriend}
            onClickFriend={handleClickFriend}
          />
          {showFormAddFriend && (
            <FormAddFriend onSubmitAddFriend={handleSubmitAddFriend} />
          )}
          <ButtonAddFriend
            showFormAddFriend={showFormAddFriend}
            onClickAddFriend={handleClickAddFriend}
          />
        </aside>
        {selectFriend && (
          <FormSelectFriend
            selectFriend={selectFriend}
            onSubmitShareBill={handleSubmitShareBill}
          />
        )}
      </main>
    </>
  );
};

export { App };

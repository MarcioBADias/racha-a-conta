/* eslint-disable react/prop-types */
import { useState } from "react"
import { Logo } from "./components/Logo"
import { ListOfItens } from "./components/ListOfItens"
import { FormAddFriend } from "./components/FormAddFriend"
import { FormSelectFriend } from "./components/FormSelectFriend"
import { ButtonAddFriend } from "./components/ButtonAddFriend"

const initialFriends = [
  {
    id: crypto.randomUUID(),
    name: 'Henrique',
    amount: -7,
    img: `/imgs/friends/henrique-48.jpg`
  },
  {
    id: crypto.randomUUID(),
    name: 'Renata',
    amount: 20,
    img: `/imgs/friends/renata-48.jpg`
  },
  {
    id: crypto.randomUUID(),
    name: 'Antonio',
    amount: 0,
    img: `/imgs/friends/antonio-48.jpg`
  }
]

const App = () => {
  const [friends, setFriends] = useState(initialFriends)
  const [selectFriend, setSelectFriend] = useState(null)
  const [showFormAddFriend, setShowFormAddFriend] = useState(false)

  const handleClickAddFriend = () => setShowFormAddFriend(b => !b)
  const handleClickFriend = friend => setSelectFriend(p => p?.id === friend.id ? null : friend)

  const handleSubmitShareBill = friend => {
    setFriends(prev => prev.map(p => friend.id === p.id ? friend : p))
    setSelectFriend(null)
  }

  const handleSubmitAddFriend = friend => {
    setFriends(prev => [...prev, friend])
    setShowFormAddFriend(false)
  }

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
          <FormAddFriend
            showFormAddFriend={showFormAddFriend}
            onSubmitAddFriend={handleSubmitAddFriend}
          />
          <ButtonAddFriend
            showFormAddFriend={showFormAddFriend}
            onClickAddFriend={handleClickAddFriend}
          />
        </aside>
        <FormSelectFriend
          selectFriend={selectFriend}
          onSubmitShareBill={handleSubmitShareBill}
        />
      </main>
    </>
  )
}

export { App }
